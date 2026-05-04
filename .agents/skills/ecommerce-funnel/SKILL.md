---
name: ecommerce-funnel
description: Construye e-commerce o productos digitales con embudos de conversión, checkout multi-pasarela (Stripe + Mercado Pago para LATAM), captura de leads, integración CRM (GoHighLevel), y abandono de carrito automatizado. Activar tras router cuando project_type = D.
---

# E-commerce + Funnel CRM

## Objetivo
Producir una tienda o sistema de venta digital donde cada visita tiene 3 destinos posibles: comprador inmediato, lead capturado, abandono recuperable. Cada uno alimenta el CRM y dispara la automatización correcta.

## Stack canónico

```
Next.js 15 (App Router)
  + Tailwind v4 + shadcn + Aceternity (hero) + Framer Motion
  + Stripe (checkout primario)
  + Mercado Pago (LATAM)
  + Sanity v3 (catálogo) o headless Shopify/MedusaJS si > 50 SKUs
  + GoHighLevel API v2 (CRM + funnel + automation)
  + n8n self-hosted (orquestador)
  + Twilio + WhatsApp Cloud API
  + Resend + React Email
  + Sentry + PostHog + Vercel
```

## Anatomía del funnel

```
[ Anuncio / Tráfico orgánico ]
            ↓
[ Landing del producto ]
   ├── botón Comprar         → Checkout (Stripe/MP) → Thank you + GHL contact
   ├── botón Más info        → Form de captura      → GHL contact + nurture
   └── salida sin acción     → Exit intent popup    → captura → GHL
            ↓
[ Email/WhatsApp follow-up automatizado vía GHL ]
   ├── Si compró: onboarding sequence
   ├── Si capturó lead: nurture sequence
   └── Si abandonó carrito: recovery sequence (15min, 24h, 72h)
```

## Estructura de archivos

```
src/
├── app/
│   ├── (shop)/
│   │   ├── page.tsx                   # storefront
│   │   ├── productos/page.tsx         # listado
│   │   ├── productos/[slug]/page.tsx  # detalle
│   │   ├── carrito/page.tsx
│   │   ├── checkout/page.tsx
│   │   └── gracias/page.tsx
│   ├── api/
│   │   ├── checkout/stripe/route.ts
│   │   ├── checkout/mercadopago/route.ts
│   │   ├── webhooks/stripe/route.ts
│   │   ├── webhooks/mercadopago/route.ts
│   │   ├── leads/route.ts             # captura de lead → GHL
│   │   └── abandoned-cart/route.ts
│   └── layout.tsx
├── lib/
│   ├── stripe/
│   ├── mercadopago/
│   ├── ghl/
│   │   ├── client.ts                  # PIT auth + Bearer
│   │   ├── contacts.ts
│   │   ├── pipelines.ts
│   │   └── workflows.ts
│   ├── catalog/
│   ├── cart/
│   └── email/
├── stores/use-cart.ts                 # Zustand persistente
└── ...
```

## Carrito persistente (Zustand)

```ts
// stores/use-cart.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = { id: string; qty: number; priceCents: number; name: string };
type Cart = {
  items: CartItem[];
  addItem: (i: CartItem) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  total: () => number;
};

export const useCart = create<Cart>()(persist((set, get) => ({
  items: [],
  addItem: (i) => set((s) => {
    const existing = s.items.find((x) => x.id === i.id);
    if (existing) return { items: s.items.map((x) => x.id === i.id ? { ...x, qty: x.qty + i.qty } : x) };
    return { items: [...s.items, i] };
  }),
  removeItem: (id) => set((s) => ({ items: s.items.filter((x) => x.id !== id) })),
  setQty: (id, qty) => set((s) => ({ items: s.items.map((x) => x.id === id ? { ...x, qty } : x) })),
  clear: () => set({ items: [] }),
  total: () => get().items.reduce((a, x) => a + x.qty * x.priceCents, 0),
}), { name: "cart-v1" }));
```

## Checkout — multi-pasarela

```ts
// lib/checkout/router.ts
export async function createCheckoutSession({ items, country, email }: Args) {
  if (["UY", "AR", "BR", "MX", "CL", "PE"].includes(country)) {
    return createMercadoPagoPreference(items, email);
  }
  return createStripeCheckoutSession(items, email);
}
```

## GoHighLevel — integración mínima

```ts
// lib/ghl/client.ts
const GHL_API = "https://services.leadconnectorhq.com";
export async function ghlRequest(path: string, init: RequestInit = {}) {
  const res = await fetch(GHL_API + path, {
    ...init,
    headers: {
      "Authorization": `Bearer ${process.env.GHL_PIT_TOKEN}`,
      "Version": "2021-07-28",
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  if (!res.ok) throw new Error(`GHL ${res.status} ${path}`);
  return res.json();
}

// lib/ghl/contacts.ts
export async function upsertContact(c: { email: string; phone?: string; firstName?: string; lastName?: string; tags?: string[]; customFields?: Record<string, string> }) {
  return ghlRequest(`/contacts/`, {
    method: "POST",
    body: JSON.stringify({ ...c, locationId: process.env.GHL_LOCATION_ID }),
  });
}

export async function moveToStage(contactId: string, pipelineId: string, stageId: string) {
  return ghlRequest(`/opportunities/`, {
    method: "POST",
    body: JSON.stringify({ contactId, pipelineId, pipelineStageId: stageId, locationId: process.env.GHL_LOCATION_ID, name: "Auto opportunity" }),
  });
}
```

Ver skill `ghl-bridge` para el detalle completo.

## Recuperación de carrito abandonado

1. Cuando usuario llega a `/checkout` sin completar, capturar email (si está en cart) y crear contact en GHL con tag `abandoned-cart-v1`.
2. GHL workflow se dispara con secuencia:
   - +15 min: email "olvidaste algo en tu carrito"
   - +24h: email + WhatsApp "todavía está disponible, te dejo 10% off"
   - +72h: email final con scarcity ("últimas unidades")
3. Cuando el usuario completa, webhook de Stripe/MP dispara remoción del tag y movimiento a stage "Cliente".

## Eventos de tracking (PostHog)

```
view_product
add_to_cart
remove_from_cart
begin_checkout
add_payment_info
purchase
lead_captured
abandoned_cart_recovered
```

Cada evento con `properties` consistentes (precio, currency, items[], country).

## Pipeline recomendada

1. Discovery + `PROJECT.md` con: # SKUs, países objetivo, métodos de pago, integraciones obligatorias.
2. `ui-spec-author` con énfasis en estados de carrito, checkout y thank-you.
3. Setup GHL: pipelines, stages, custom fields, workflows, PIT token. Documentar IDs en `CONTEXT.md`.
4. Rebanadas verticales:
   - S-1: storefront read-only (productos desde Sanity).
   - S-2: cart cliente con persist.
   - S-3: checkout Stripe + thank-you.
   - S-4: webhook Stripe → GHL contact + opportunity.
   - S-5: checkout Mercado Pago (rama LATAM).
   - S-6: lead form (popup, exit-intent) → GHL.
   - S-7: abandoned cart capture + workflow GHL.
   - S-8: WhatsApp follow-up (Twilio o GHL nativo).
5. Tests E2E del flujo crítico (compra completa) con Playwright.
6. Performance + a11y normales.

## Constraints / Do NOT

- NO permitir doble cobro: idempotency keys obligatorias en endpoints de checkout.
- NO confiar en `localStorage` para guardar PII; cart sí, datos personales no.
- NO mostrar el carrito como popup intrusivo; usar drawer (`vaul`).
- NO hacer signup forzado para checkout; permitir guest checkout siempre.
- NO enviar mensajes de WhatsApp a contactos no opt-in (Meta política).
- NO mezclar tax/IVA en precios visibles vs total final sin avisar; transparencia gana conversión.
- NO usar GHL como única fuente de verdad para inventario; mantenerlo en tu DB/CMS.
