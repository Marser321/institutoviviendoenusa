---
name: ghl-bridge
description: Bridge entre la web y GoHighLevel (CRM). Maneja autenticación PIT, sync de contactos, opportunities, custom fields, workflows trigger por webhook, y mapeo bidireccional de pipelines. Activar cuando el proyecto integra GHL como CRM o sistema de funnel.
---

# GHL Bridge

## Objetivo
Establecer una integración limpia, segura y observable con GoHighLevel desde la web del cliente, con mapeo explícito de qué dispara qué workflow, qué custom field guarda qué dato, y cómo se recupera el estado.

## Pre-requisitos del cliente

Antes de tocar código, conseguir y documentar en `CONTEXT.md`:

```yaml
ghl:
  location_id: "<sub-account ID>"
  pit_token: "<en .env, NUNCA en código>"
  pipelines:
    sales:
      id: "<pipeline_id>"
      stages:
        new_lead:        "<stage_id>"
        qualifying:      "<stage_id>"
        proposal_sent:   "<stage_id>"
        won:             "<stage_id>"
        lost:            "<stage_id>"
    abandoned_cart:
      id: "<pipeline_id>"
      stages:
        abandoned:       "<stage_id>"
        recovered:       "<stage_id>"
        lost:            "<stage_id>"
  custom_fields:
    source_url:          "<field_id>"
    plan_interest:       "<field_id>"
    cart_value_cents:    "<field_id>"
    last_product_viewed: "<field_id>"
  workflows:
    welcome_lead:        "<workflow_id>"
    abandoned_cart:      "<workflow_id>"
    post_purchase:       "<workflow_id>"
  webhooks:
    inbound_url: "https://api.<dominio>/api/webhooks/ghl"
    secret:      "<en .env>"
```

## Cliente API base

```ts
// lib/ghl/client.ts
const BASE = "https://services.leadconnectorhq.com";
const VERSION = "2021-07-28";

export async function ghl<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  const url = path.startsWith("http") ? path : BASE + path;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Authorization": `Bearer ${process.env.GHL_PIT_TOKEN!}`,
      "Version": VERSION,
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL ${res.status} ${path} :: ${text}`);
  }
  return res.json() as Promise<T>;
}
```

## Servicios típicos

### Upsert de contacto
```ts
export async function upsertContact(input: {
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  tags?: string[];
  customFields?: { id: string; value: string | number }[];
  source?: string;
}) {
  return ghl<{ contact: { id: string } }>("/contacts/upsert", {
    method: "POST",
    body: JSON.stringify({
      locationId: process.env.GHL_LOCATION_ID,
      email: input.email,
      phone: input.phone,
      firstName: input.firstName,
      lastName: input.lastName,
      tags: input.tags,
      customFields: input.customFields,
      source: input.source ?? "web",
    }),
  });
}
```

### Crear oportunidad
```ts
export async function createOpportunity(input: {
  contactId: string;
  pipelineId: string;
  stageId: string;
  name: string;
  monetaryValue?: number;
}) {
  return ghl("/opportunities/", {
    method: "POST",
    body: JSON.stringify({
      locationId: process.env.GHL_LOCATION_ID,
      contactId: input.contactId,
      pipelineId: input.pipelineId,
      pipelineStageId: input.stageId,
      name: input.name,
      monetaryValue: input.monetaryValue,
      status: "open",
    }),
  });
}
```

### Disparar workflow específico
```ts
export async function addContactToWorkflow(contactId: string, workflowId: string) {
  return ghl(`/contacts/${contactId}/workflow/${workflowId}`, { method: "POST" });
}
```

### Tag dinámico
```ts
export async function addTags(contactId: string, tags: string[]) {
  return ghl(`/contacts/${contactId}/tags`, { method: "POST", body: JSON.stringify({ tags }) });
}
```

## Webhook inbound (GHL → tu app)

```ts
// app/api/webhooks/ghl/route.ts
import crypto from "node:crypto";

export async function POST(req: Request) {
  const raw = await req.text();
  const signature = req.headers.get("x-ghl-signature");
  const expected = crypto.createHmac("sha256", process.env.GHL_WEBHOOK_SECRET!).update(raw).digest("hex");
  if (signature !== expected) return new Response("bad sig", { status: 401 });
  const event = JSON.parse(raw);
  // dedupe por event.id si viene
  // process: e.g. event.type === "OpportunityStageChanged"
  return new Response("ok");
}
```

## Mapeo de eventos (web ↔ GHL)

| Evento web                    | Acción GHL                                                                  |
|-------------------------------|------------------------------------------------------------------------------|
| Lead form submit              | upsertContact + addTag `lead-v1` + addToWorkflow `welcome_lead`              |
| Pricing page view (3+ veces)  | upsertContact + customField `plan_interest=high`                             |
| Add to cart                   | upsertContact + customField `cart_value_cents` + customField `last_product`  |
| Begin checkout                | createOpportunity en pipeline `abandoned_cart` stage `abandoned` (15min TTL) |
| Purchase complete             | move opportunity → won + addToWorkflow `post_purchase` + addTag `customer`   |
| Cancel subscription           | move opportunity → lost + addTag `churned`                                   |

## Resiliencia

- Cada llamada a GHL via try/catch con log a Sentry.
- Retry con backoff exponencial para 5xx y 429 (rate limit).
- Cola: si GHL falla, encolar en Redis/BullMQ o en queue de n8n; no dejar que un fail de GHL rompa el checkout del usuario.
- Logs de cada upsert con `correlation_id` para auditar.

```ts
async function withRetry<T>(fn: () => Promise<T>, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try { return await fn(); }
    catch (e: any) {
      if (i === attempts - 1) throw e;
      await new Promise((r) => setTimeout(r, 200 * 2 ** i));
    }
  }
  throw new Error("unreachable");
}
```

## Validación canaria (pre go-live)

1. Crear contacto de prueba con email único.
2. Disparar cada flujo desde la web staging.
3. Verificar en GHL: contacto creado, tags correctos, opportunity en stage correcto, workflow ejecutado.
4. Verificar webhook inbound recibido y procesado.
5. Solo entonces marcar la integración como `done` en `STATE.md`.

## Constraints / Do NOT

- NO commitear `GHL_PIT_TOKEN`, `GHL_WEBHOOK_SECRET`, ni `GHL_LOCATION_ID`. Todo en `.env` + provider de secrets en deploy.
- NO mezclar staging GHL con production GHL; usar dos sub-accounts distintas.
- NO hacer requests sincrónicas a GHL en el render path; usar background jobs o background fetch tras respuesta al usuario.
- NO confiar en pipelines/stages "por nombre"; siempre usar IDs guardados en `CONTEXT.md`.
- NO crear duplicados: usar `upsert` (busca por email) en vez de `create`.
- NO enviar PII innecesaria a GHL si no la vas a usar.
