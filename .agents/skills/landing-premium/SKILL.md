---
name: landing-premium
description: Construye landing pages premium de conversión visualmente impactantes consumiendo el CURATED-BRIEF.md (estilo del catálogo + blueprint de secciones con recetas mágicas) y orquestando magic-section-designer + vibe-design-pipeline para cada sección. Bias por defecto a impacto (Editorial Dramatic, Kinetic Cinematic, Glassmorphic Luxury, Neo-Vivid, etc.) — no minimalismo. Activar tras router cuando project_type = A. Stack default Astro 5 + Tailwind v4 + Framer Motion + Lenis + librería UI premium del estilo elegido.
---

# Landing Premium

## Objetivo
Producir una landing page que cobre USD 15-25K. La diferencia con una landing genérica está en: estilo visual de carácter (no minimalismo plano), motion sincronizado, contenido que vende, performance clínica, micro-interacciones memorables.

## Pre-requisitos
- `docs/CURATED-BRIEF.md` con `primary_style`, `tech_stack`, y `## 7. Blueprint sección por sección` poblado.
- `docs/UI-SPEC.md` con tokens del estilo elegido.
- Skills cargadas: `magic-section-designer`, `vibe-design-pipeline`, `motion-polish`.

## Stack canónico (ajustado al estilo del brief)

```
Astro 5
  + Tailwind v4 (@theme tokens del UI-SPEC)
  + shadcn primitives (Button, Sheet, Sonner)
  + Librería UI premium del estilo (1 principal):
      Editorial Dramatic   → magic-ui (text shimmer, marquee), aceternity-ui (text reveal)
      Kinetic Cinematic    → aceternity-ui (Spotlight, Sparkles, Beam) + r3f para mockup 3D
      Glassmorphic Luxury  → cult-ui + aceternity-ui (BackgroundGradient) + r3f opcional
      Neo-Vivid            → magic-ui (Marquee, Particles) + paper-shaders (mesh)
      Brutalist Bold       → custom + magic-ui (marquee gigante)
      Organic Warm         → lottie-react + framer-motion + custom textures
      Dark Tech            → magic-ui (typing, retro grid) + aceternity-ui (Spotlight, Vortex)
      Retro Futurism       → custom shaders/filters + magic-ui (RetroGrid)
      Maximalist Layered   → magic-ui (todas las capas) + lottie + multiple marquees
  + Framer Motion (default) + Lenis (smooth scroll en estilos cinemáticos)
  + GSAP + ScrollTrigger (solo si el blueprint pide receta de scroll storytelling)
  + lucide-react o icons custom según estilo
  + Resend (form contacto) + React Email
  + PostHog o Plausible
  + Netlify o Vercel
```

La librería exacta sale del `CURATED-BRIEF.md`. **No mezclar 3 librerías UI premium distintas**: una primaria + shadcn primitives + custom solo cuando justifica.

## Anatomía obligatoria

### Sección 0 · Above the fold (ATF)
- Logo + nav minimalista, máximo 5 enlaces.
- Hero: H1 corto (≤ 8 palabras), subtítulo (≤ 22 palabras), 1 CTA primario, 1 secundario opcional.
- Visual: hero shot, mockup 3D, video loop ≤ 6s, o background animado sutil.
- Trust bar inmediato (logos clientes, rating, métrica de uso).
- LCP target: ≤ 1.5s mobile.

### Sección 1 · Problem / Pain
- Articula el dolor concreto del visitante en 1-2 párrafos.
- Visual de contraste: "antes" feo, gris, sin esperanza.

### Sección 2 · Solution / Promise
- 3 value props, no más.
- Cada una: ícono custom (no lucide básico), título corto, 1 párrafo, opcional micro-demo animada.

### Sección 3 · Demo / Producto en acción
- Video loop, animación de producto, o screenshots interactivos.
- Si es app: dispositivo (laptop/mobile) con mockup realista.

### Sección 4 · Social Proof
- Testimonials con foto real (no stock), nombre completo, rol, empresa con logo.
- Métricas duras: "284 clientes", "USD 4.2M generados", "97% retención".
- Logos enterprise si aplica.

### Sección 5 · Cómo funciona
- 3-4 pasos visuales del proceso.
- Idealmente animado (stagger reveal).

### Sección 6 · Pricing (si aplica)
- 3 planes max, uno destacado.
- Toggle anual/mensual con descuento visible.
- FAQ contextual al pricing.

### Sección 7 · FAQ
- 6-10 preguntas, accordion accesible.
- Las preguntas son las objeciones reales, no excusas.

### Sección 8 · CTA final
- Repite el CTA principal con copy renovado.
- Una garantía o reducción de fricción ("sin tarjeta", "cancela cuando quieras").

### Footer
- Mínimo: links legales, redes, contacto, idioma.
- Newsletter signup opcional.

## Reglas de copywriting

1. **H1**: promesa específica + medible si posible.
2. **Subtítulo**: para quién, qué hace, cómo lo logra.
3. **CTAs**: verbos de acción + beneficio. NUNCA "Click here", "Submit".
4. **Microcopy**: confirmar acciones, reducir ansiedad ("guardado automáticamente", "tu email no se comparte").
5. **Errores**: humanos, accionables, nunca técnicos ("no se pudo guardar, ¿reintentar?").

## Reglas de motion en landing

- Hero: max 1 animación principal + reveal del CTA.
- Scroll-triggered reveals con stagger 80-120ms.
- Sticky scroll telling solo en sección "cómo funciona".
- Smooth scroll con Lenis activo en todas las páginas.
- Cero parallax sin razón (deshabilitar en mobile).

## Estructura de archivos sugerida

```
src/
├── pages/
│   ├── index.astro
│   ├── pricing.astro
│   └── thank-you.astro
├── sections/
│   ├── Hero.tsx
│   ├── Pain.tsx
│   ├── Solution.tsx
│   ├── Demo.tsx
│   ├── Social.tsx
│   ├── HowItWorks.tsx
│   ├── Pricing.tsx
│   ├── FAQ.tsx
│   └── CTA.tsx
├── components/ (Header, Footer, ContactForm, etc.)
├── lib/ (resend.ts, analytics.ts)
└── styles/global.css
```

## Pipeline recomendada (impact-first)

1. `business-research-curator` → `CURATED-BRIEF.md` con estilo + blueprint de secciones con recetas (`A.X`, `B.X`, etc.).
2. `ui-spec-author` → `UI-SPEC.md` con tokens del estilo.
3. (Opcional) Generar mockup en Stitch o v0 (prompts en `templates/prompts/`).
4. **Por cada sección del blueprint**:
   - `magic-section-designer` aplica la receta del catálogo (consume `section-recipes.md`).
   - `frontend-foundation` cierra la estructura.
   - `stylistic-audit` → `a11y-audit` → `performance-audit` → `motion-polish`.
   - Commit atómico de la rebanada.
5. Integrar form con Resend + endpoint Astro.
6. Plausible/PostHog wired.
7. Pre-deploy: `25k-quality-bar.md` checklist.

**Regla crítica**: NO empezar a codear secciones sin el blueprint de recetas en el CURATED-BRIEF. Si el blueprint falta, `business-research-curator` lo genera primero.

## Constraints / Do NOT

- NO meter > 7 secciones; mata conversión.
- NO usar 4+ tipografías "porque queda lindo".
- NO embed videos pesados sin lazy-load.
- NO hover effects esenciales (tablets/mobile no los disparan).
- NO copy que repite la propuesta de valor 4 veces igual.
- NO testimonios stock con foto AI; cliente real o nada.

## Métrica de éxito

- LCP mobile ≤ 1.5s.
- Lighthouse: Perf 95+, A11y 95+, SEO 95+.
- CLS < 0.05.
- Tiempo de bounce en hero < 25%.
- Conversión visitor → CTA click ≥ 3% (medir con Plausible).
