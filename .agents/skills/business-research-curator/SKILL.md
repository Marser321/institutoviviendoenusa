---
name: business-research-curator
description: Toma un archivo de research sobre un negocio (industria, audiencia, competencia, branding actual, KPIs) y devuelve un brief curado con tipo de proyecto, estilo visual recomendado de impacto, stack técnico, skills a activar, librerías premium prioritarias, y un blueprint sección-por-sección con recetas mágicas específicas. Por defecto recomienda estilos visualmente impactantes (no minimalistas) salvo que el research o el cliente lo pidan explícito. Activar SIEMPRE al inicio de un proyecto cuando exista un .md de research del negocio, antes de 00-router, antes de tocar UI-SPEC.md, y antes de cualquier decisión de tecnología o estilo. Usar también cuando el usuario diga "investigué a este cliente", "tengo el análisis del negocio", "cómo abordaríamos esto", o cuando comparta links/docs sobre la industria, competencia o audiencia objetivo del cliente.
---

# Business Research Curator

## Por qué existe esta skill

El arsenal genérico te lleva a sitios "técnicamente correctos pero olvidables" — el LLM por defecto produce minimalismo seguro porque es lo que sale limpio sin pelearle. Para webs USD 25K eso es la trampa: salen prolijas y se las lleva el viento.

Esta skill traduce el research del negocio (industria, branding, audiencia, competencia, mood emocional buscado) en decisiones concretas y sesgadas a impacto. Cada output va a un archivo persistente del proyecto que después usan las otras skills (00-router, ui-spec-author, vibe-design-pipeline, magic-section-designer).

## Filosofía de default

**El default de esta skill es impacto, no minimalismo.** Minimalismo se recomienda SOLO cuando:
- El research dice explícitamente "mood minimalista" o "look limpio profesional".
- La industria es legal, contable, médica conservadora, financiera tradicional.
- El competidor benchmark del cliente lo pide (todos sus competidores son minimalistas).
- El cliente lo solicita por escrito.

En cualquier otro caso, recomendar uno de los **10 estilos visualmente impactantes** del catálogo (`references/visual-styles.md`).

## Prerrequisitos

- Un archivo en `uploads/` o en el repo del proyecto con research del negocio en formato markdown. Mínimo: industria, audiencia, propuesta de valor, 3-5 referencias de competencia, deseos de branding (si los hay).
- Si el research está incompleto, **frená y pedí lo que falta** antes de generar el brief. No inventes señales.

## Instrucciones operativas

### Fase 1 · Leer y diseccionar el research

1. Leé el .md completo. Identificá:
   - **Industria / sector**: tech / fintech / wellness / e-commerce / educación / agencia / salud / legal / etc.
   - **Sub-vertical**: SaaS B2B / D2C consumer / marketplace / agencia creativa / clínica / etc.
   - **Audiencia objetivo**: demográfica + psicográfica + nivel adquisitivo.
   - **Brand maturity**: startup / growth-stage / establecido / enterprise / personal brand.
   - **Temperatura emocional buscada**: aspiracional / confiable / juguetón / autoritario / rebelde / cálido / técnico-frío.
   - **Competencia directa**: 3-5 referencias y qué hacen visualmente.
   - **Diferencial vs. competencia**: ¿qué los hace distintos?
   - **KPIs**: ¿qué quiere medir el negocio? (conversión, retención, ARPU, leads, brand awareness).
   - **Restricciones**: identidad visual existente, manual de marca, idiomas, compliance.

2. Si alguno de estos campos está vacío en el research, anotalo en una sección `<gaps>` del output y pedí completar antes de avanzar.

### Fase 2 · Mapear señales a estilo visual

Cargá `references/business-style-matrix.md`. Es la tabla de mapeo señal → estilo. Aplicala al perfil del negocio.

Para cada combinación industria × audiencia × emocional, la matriz devuelve uno o dos estilos primarios y uno alternativo. El catálogo completo de los 10 estilos está en `references/visual-styles.md`.

**Sesgos por default** (en caso de duda, elegir el más impactante):
- Tech / SaaS bold → **Kinetic Cinematic** o **Glassmorphic Luxury**.
- Fintech / cripto / fintech B2C → **Glassmorphic Luxury** o **Dark Tech**.
- Agencia creativa / design / fashion → **Editorial Dramatic** o **Brutalist Bold**.
- Wellness / food / lifestyle → **Organic Warm** o **Editorial Dramatic**.
- E-commerce premium → **Editorial Dramatic** o **Glassmorphic Luxury**.
- E-commerce consumer / D2C → **Neo-Vivid** o **Organic Warm**.
- Gaming / música / cultura → **Retro Futurism** o **Maximalist Layered**.
- Dev tools / cybersecurity → **Dark Tech** o **Brutalist Bold**.
- Servicios profesionales premium (legal, contable, salud premium) → **Glassmorphic Luxury** o **Minimal Refined** (uno de los pocos casos donde minimal aplica).
- Educación / cursos online → **Neo-Vivid** o **Editorial Dramatic**.

### Fase 3 · Recomendar tech stack

Usá el contexto del negocio + el tipo de proyecto inferido para mapear stack:

- **Landing pure** (1 página, alta conversión, cinemática) → Astro 5 + Tailwind v4 + Framer Motion + Lenis + GSAP (si scroll storytelling) + librería UI premium del estilo elegido.
- **Sitio corporativo + blog + i18n** → Astro 5 + Tailwind v4 + Sanity v3 o Payload + paraglide + sharp.
- **SaaS con auth + billing** → Next.js 15 + Tailwind v4 + shadcn + Better Auth + Drizzle + Stripe + Tremor.
- **E-commerce + funnel CRM** → Next.js 15 + Tailwind v4 + shadcn + Stripe + Mercado Pago + GoHighLevel + n8n.

Si el estilo recomendado tiene 3D (Kinetic Cinematic, Glassmorphic Luxury con objetos, Retro Futurism), sumá React Three Fiber + drei o Spline. Si tiene shaders/gradientes complejos (Neo-Vivid, Mesh Gradients), sumá Paper Shaders o un componente custom de mesh gradient.

### Fase 4 · Generar el blueprint sección-por-sección

Para cada sección del sitio, asignar **una receta mágica específica** del catálogo en `references/section-recipes.md`. NO repetir tratamientos genéricos.

El criterio de selección:
1. Coherencia con el estilo visual elegido.
2. Sin canibalizar atención entre secciones (si el hero es ultra-cinemático, el siguiente debe bajar la intensidad para que el hero respire).
3. Cada sección debe tener un "momento memorable" — algo que el visitante recuerda al cerrar el tab.
4. La receta debe ser implementable con las librerías del stack ya elegido.

### Fase 5 · Producir el output

Generar un único archivo `docs/CURATED-BRIEF.md` con esta estructura exacta:

```yaml
# CURATED BRIEF — <nombre del negocio>
generated: <YYYY-MM-DD>
based_on: <ruta al research .md>

## 1. Clasificación del negocio
industry: <e.g. fintech B2C>
subvertical: <e.g. neobank latam>
audience: <demo + psicográfica corta>
brand_maturity: startup | growth | established | enterprise | personal
emotional_register: aspiracional | confiable | juguetón | autoritario | rebelde | cálido | técnico
competitive_pressure: high | medium | low

## 2. Tipo de proyecto
type: A landing | B corporativo | C SaaS | D e-commerce-funnel | hybrid
confidence: high | medium | low
rationale: <por qué este tipo y no otro>

## 3. Estilo visual recomendado
primary_style: <uno de los 10>
alternative_styles: [<otros 1-2 que también encajan>]
why: <razones concretas conectadas a la audiencia y al diferencial>
mood_adjectives: [<3 palabras>]
not_minimalist_because: <una frase explicando por qué no minimal — o "minimal explícitamente pedido por X razón">
reference_sites: [<2-4 URLs reales con nota de qué tomar de cada uno>]

## 4. Tech stack recomendado
core_stack: <e.g. Next.js 15 + Tailwind v4 + shadcn + Better Auth + Drizzle>
visual_libraries: [<aceternity-ui | magic-ui | cult-ui | r3f+drei | spline | gsap | paper-shaders | etc.>]
motion_strategy: <FM-only | FM+GSAP scroll-storytelling | R3F-heavy | shader-driven | etc.>
why_this_stack: <conexión con la audiencia, performance budget, y mantenibilidad>

## 5. Skills a activar
mandatory: [00-router, rpiv-gate, vertical-slicer, context-hygiene, stylistic-audit, a11y-audit, performance-audit]
type_specific: [<según tipo>]
magic_layer: [magic-section-designer, motion-polish, ui-spec-author]

## 6. Librerías premium prioritarias (en orden de importancia)
- <lib1> — para <sección/efecto específico>
- <lib2> — para <...>
- <...>

## 7. Blueprint sección por sección
sections:
  - id: hero
    treatment: <receta del catálogo, e.g. "kinetic-title-with-3d-mockup">
    why: <conexión con audiencia y estilo>
    libraries: [<lib1>, <lib2>]
    intensity: high | medium | subtle
    a11y_consideration: <e.g. "cubrir prefers-reduced-motion con fallback estático del headline">
    performance_budget: <e.g. "LCP ≤ 1.5s; lazy-load del 3D model si >300kb">
  - id: trust-bar
    treatment: <receta>
    ...
  - id: features
    treatment: <receta>
    ...
  - id: <etc por cada sección del ROADMAP>

## 8. Riesgos y banderas rojas
- <riesgo concreto>
- <riesgo de performance, de a11y, de scope, de marca>

## 9. Decisiones que requieren al cliente antes de avanzar
- <decisión bloqueante con opciones presentadas>

## 10. Gaps en el research (si los hubiera)
gaps:
  - <campo faltante>
  - <información ambigua>
```

### Fase 6 · Validación con el usuario

Después de generar el brief:

1. Resumí en 5 bullets las decisiones más importantes (estilo, stack, 3 secciones más relevantes).
2. Pedí OK explícito antes de que `00-router` y `ui-spec-author` consuman este brief.
3. Si el usuario quiere cambiar el estilo recomendado, ofrecé las **alternativas explicitadas en el catálogo** y registrá la decisión en `CONTEXT.md` como `D-NN`.

## Cómo encadena con el resto del arsenal

```
research.md (cliente/agencia/tu)
        ↓
[business-research-curator] → CURATED-BRIEF.md
        ↓                          ↓
   00-router                 ui-spec-author
   (clasifica, valida)       (consume el style + tokens)
        ↓                          ↓
   ROADMAP.md                  UI-SPEC.md
        ↓                          ↓
   ┌──────── magic-section-designer ────────┐
   │ aplica recetas del blueprint sección a sección │
   └──────────────────────┬─────────────────┘
                          ↓
              vibe-design-pipeline (5 pasadas)
```

## Referencias bundle

Esta skill consume tres referencias progresivas:

- **`references/visual-styles.md`** — el catálogo completo de 10 estilos visualmente impactantes con tokens, librerías, y casos de uso. Leer cuando se decide el estilo.
- **`references/section-recipes.md`** — el catálogo de recetas mágicas por tipo de sección. Leer cuando se construye el blueprint.
- **`references/business-style-matrix.md`** — la tabla de mapeo señal → estilo. Leer al inicio de la fase 2.

Leer estas referencias completas SOLO cuando son relevantes para no quemar contexto. Si ya las leíste en esta sesión, asumir que están en memoria.

## Constraints / Do NOT

- NO recomendar minimalismo como default. Necesita justificación explícita.
- NO inventar señales del negocio que no estén en el research.
- NO mezclar 3 estilos visuales en un mismo brief — uno primario, uno alternativo claro.
- NO recomendar más de 5 librerías UI premium para un mismo proyecto (mantenibilidad).
- NO forzar al cliente a un estilo que no encaja con su audiencia solo porque "se ve bien".
- NO empezar a clasificar (00-router) ni a generar tokens (ui-spec-author) hasta que el usuario apruebe el brief.

## Few-Shot Example

**Input** (`uploads/research-yogamembership.md`):
> "Plataforma de yoga online, target mujeres 28-45 LATAM clase media-alta, foco en bienestar holístico, competencia: Down Dog, Glo, AloMoves. Branding existente: warm tones (terracotta, beige). Quieren transmitir calidez, comunidad, transformación interior. KPIs: conversion a suscripción mensual, retención mes 2, NPS."

**Output esperado** (extracto):
```yaml
# CURATED BRIEF — Yoga Membership Platform
industry: wellness / online learning
audience: mujeres 28-45, LATAM clase media-alta, buscan transformación interior + comunidad
emotional_register: cálido + aspiracional
type: C (SaaS con auth) + elementos D (funnel de captura)
primary_style: Organic Warm
alternative_styles: [Editorial Dramatic]
not_minimalist_because: "branding cálido pre-existente + audiencia conectada con lo orgánico/táctil; minimal sería frío y distante"
core_stack: Next.js 15 + Tailwind v4 + shadcn + Better Auth + Drizzle + Stripe + Mercado Pago
visual_libraries: [aceternity-ui (sparkles + spotlight), framer-motion, lenis, lottie-react (ilustraciones de yoga), sanity (catálogo de clases)]
sections:
  - id: hero
    treatment: video-background-textured + handwritten-overlay-headline
    why: "transmite la práctica real de yoga + textura cálida del estilo organic"
    libraries: [framer-motion, sharp]
  - id: features (3 value props)
    treatment: bento-asymmetric-with-organic-shapes
  - id: instructors
    treatment: card-stack-with-portrait-photography
  - id: testimonials
    treatment: marquee-quote-cards-with-warm-frames
  - id: pricing
    treatment: floating-cards-mexican-paper-texture
  - id: cta
    treatment: aurora-gradient-warm-with-inline-form
```

Y vuelve al usuario con: "Curé el brief. Estilo recomendado: Organic Warm. ¿OK para que ui-spec-author genere los tokens y 00-router clasifique como tipo C?".
