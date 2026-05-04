---
name: project-type-router
description: Clasifica el proyecto web en uno de los tipos (A landing premium, B corporativo, C SaaS con auth, D e-commerce + funnel) consumiendo CURATED-BRIEF.md (preferido) o PROJECT.md + REQUIREMENTS.md, y devuelve la lista exacta de skills, stack, plantillas y librerías premium a activar. Ejecutar al iniciar cualquier sesión nueva sobre un proyecto, idealmente DESPUÉS de business-research-curator. Si no hay CURATED-BRIEF, primero invocar a business-research-curator.
---

# 00 · Project Type Router

## Objetivo
Eliminar la ambigüedad inicial: antes de tocar código, determinar deterministicamente qué tipo de proyecto se está atacando para activar el conjunto correcto de skills, stack y reglas. Sin este paso el agente alucina decisiones de arquitectura.

## Orden de prioridad de inputs

1. **`docs/CURATED-BRIEF.md`** (preferido) — generado por `business-research-curator`. Trae ya el `type`, el estilo visual, el stack y el blueprint. Esta skill solo valida y emite el output estructurado.
2. **`docs/PROJECT.md` + `docs/REQUIREMENTS.md`** — si no hay CURATED-BRIEF, intentar inferir desde estos.
3. **Si no hay ninguno**, frená y delegá a `business-research-curator` (o pedile al usuario el research del negocio).

## Instrucciones operativas

1. **Lee primero `docs/CURATED-BRIEF.md`**. Si existe, usalo como fuente de verdad.
2. Si no existe, leé `docs/PROJECT.md` y `docs/REQUIREMENTS.md`. Si tampoco existen, frená y solicitá al usuario completar discovery con `rpiv-gate` + `business-research-curator`.
2. **Clasificá** el proyecto en exactamente UNA de estas categorías:
   - **A · Landing Premium** — single-page o ≤ 5 secciones, foco conversión, alta densidad de motion/3D, sin auth, sin DB transaccional.
   - **B · Sitio Corporativo / Institucional** — multi-página, blog/docs, multi-idioma posible, CMS headless, foco SEO/contenido.
   - **C · SaaS con Auth** — login, dashboard, multi-tenant, base de datos transaccional, billing.
   - **D · E-commerce + Funnel CRM** — catálogo, checkout, integración GoHighLevel/CRM, automation de leads.
3. **Emitir un bloque YAML** con esta forma exacta como output:

```yaml
project_type: A | B | C | D | hybrid
project_name: "<nombre del cliente>"
visual_style: <copiado del CURATED-BRIEF si existe>
default_stack: "Astro 5 + Tailwind v4" | "Next.js 15 + Tailwind v4" | etc
mandatory_skills:
  - business-research-curator   # ya corrió
  - vibe-design-pipeline
  - rpiv-gate
  - vertical-slicer
  - context-hygiene
  - stylistic-audit
  - a11y-audit
  - performance-audit
  - magic-section-designer   # ✱ obligatoria — aplica recetas mágicas al blueprint
type_specific_skills:
  - <skills propias del tipo>
templates_to_use:
  - templates/stacks/<stack>/
  - templates/gsd/UI-SPEC.md
prompts_library:
  - templates/prompts/<v0|lovable|stitch>-prompts.md
priority_libraries: ["lib1", "lib2", "..."]   # leídas del CURATED-BRIEF
section_blueprint_pending: yes | no   # si CURATED-BRIEF trae blueprint completo
risks_to_flag:
  - <riesgo específico de este tipo>
```

4. **NO** comenzar a escribir código hasta que el usuario confirme la clasificación con un "OK" explícito.

## Mapeo de skills por tipo

```yaml
A_landing_premium:
  type_specific_skills: [landing-premium, motion-polish, ui-spec-author, frontend-foundation]
  default_stack: "Astro 5 + Tailwind v4 + Framer Motion + Lenis"
  priority_libraries: ["aceternity-ui", "magic-ui", "framer-motion", "lenis", "lucide-react"]
  risks: ["over-animation matando performance", "hero 3D sin fallback mobile"]

B_corporate_site:
  type_specific_skills: [corporate-site, ui-spec-author, frontend-foundation]
  default_stack: "Astro 5 + Tailwind v4 + Sanity v3"
  priority_libraries: ["sanity", "velite", "next-intl/paraglide", "fontsource"]
  risks: ["i18n no planeada", "Core Web Vitals en blog con MDX pesado", "schema CMS demasiado rígido"]

C_saas_auth:
  type_specific_skills: [saas-auth-stack, frontend-foundation, ui-spec-author, motion-polish]
  default_stack: "Next.js 15 + Tailwind v4 + shadcn + Better Auth + Drizzle + Postgres"
  priority_libraries: ["better-auth", "drizzle-orm", "tanstack-query", "zod", "stripe", "tremor", "resend"]
  risks: ["auth con flows incompletos", "RLS no configurada", "billing sin webhooks idempotentes"]

D_ecommerce_funnel:
  type_specific_skills: [ecommerce-funnel, ghl-bridge, frontend-foundation, motion-polish]
  default_stack: "Next.js 15 + Tailwind v4 + shadcn + Stripe/MercadoPago + GoHighLevel"
  priority_libraries: ["stripe", "mercadopago", "gohighlevel-api", "n8n", "twilio-whatsapp", "resend"]
  risks: ["pasarela LATAM no compatible", "GHL pipeline sin sync inicial", "WhatsApp Business no aprobado"]
```

## Few-Shot Example

**Input** (`PROJECT.md`):
> "Plataforma de cursos online para estudio de yoga con suscripciones, login, embudo de captura, área de miembro y pagos."

**Output esperado**:
```yaml
project_type: C
project_name: "Yoga Membership Platform"
default_stack: "Next.js 15 + Tailwind v4 + shadcn + Better Auth + Drizzle + Postgres"
mandatory_skills: [vibe-design-pipeline, rpiv-gate, vertical-slicer, context-hygiene, stylistic-audit, a11y-audit, performance-audit]
type_specific_skills: [saas-auth-stack, frontend-foundation, ui-spec-author, motion-polish, ecommerce-funnel]
templates_to_use:
  - templates/stacks/nextjs-15-shadcn/
  - templates/gsd/UI-SPEC.md
priority_libraries: [better-auth, drizzle-orm, stripe, mercadopago, tanstack-query, zod, resend, sentry]
risks_to_flag:
  - "Hibridación SaaS + funnel: confirmar si CRM es GHL o nativo"
  - "Pagos LATAM: validar Mercado Pago como secundario a Stripe"
  - "Streaming de video: definir provider (Mux, Cloudflare Stream)"
```

## Constraints / Do NOT

- NO clasificar sin haber leído `PROJECT.md` y `REQUIREMENTS.md` completos.
- NO mezclar dos tipos de proyecto (`C+D`); si el cliente pide ambas, clasificar como dominante y declarar la otra como **fase 2**.
- NO empezar a generar código antes de confirmación explícita del usuario.
- NO inventar requisitos que no estén en `REQUIREMENTS.md` — pedir al usuario y registrar como `REQ-XXX`.
