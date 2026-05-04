---
name: ui-spec-author
description: Construye el archivo UI-SPEC.md como contrato estético de impacto del proyecto, traduciendo el estilo visual elegido por business-research-curator (uno de los 10 estilos del catálogo, sesgado a impacto) en tokens cuantitativos: copywriting, paleta cromática (oklch), escala tipográfica, sistema de espaciado, motion canónico, estados de UI, librerías permitidas, y patrones de página. Activar después de business-research-curator y antes de cualquier generación visual o vibe-design-pipeline. Por defecto produce specs visualmente impactantes (no minimalistas) — minimalismo solo si el CURATED-BRIEF.md lo pide explícitamente con justificación. Usar también cuando el usuario diga "armemos el design system", "necesito los tokens", "el manual visual", "los estilos del proyecto".
---

# UI-Spec Author

## Objetivo
Producir un `UI-SPEC.md` que sea contrato visual no negociable, optimizado para impacto. La diferencia entre un sitio USD 25K y uno USD 800 vive acá: un spec preciso de 6 pilares cuantitativos genera componentes coherentes; un spec ambiguo genera Frankenstein.

## Filosofía de default

**Esta skill produce specs sesgados a impacto** porque los LLMs por sí solos default a minimalismo seguro (que es la trampa). El input clave es el `CURATED-BRIEF.md` con el estilo recomendado.

Solo se genera spec minimal-refined cuando el `CURATED-BRIEF.md` lo declara explícitamente como `primary_style: Minimal Refined` con justificación tildada en la matriz `business-style-matrix.md`.

## Cuándo activar
- Inmediatamente después de `business-research-curator` (consume `CURATED-BRIEF.md`).
- Antes de `vibe-design-pipeline` o `frontend-foundation`.
- Cuando el cliente entrega manual de marca (ingerirlo y traducirlo a UI-SPEC manteniendo el estilo del catálogo más cercano).
- Cuando el usuario pide "armemos los tokens" o "el manual visual del proyecto".

## Pre-requisitos

1. `docs/CURATED-BRIEF.md` con `primary_style` decidido y validado.
2. Manual de marca del cliente (si lo hay) en `uploads/`.
3. Confirmación del usuario sobre el estilo recomendado.

Si no hay `CURATED-BRIEF.md`, frená y delegá a `business-research-curator` primero.

## Los 6 pilares del UI-SPEC

### 1 · Copywriting comercial
- Tono de voz alineado al `emotional_register` del brief.
- CTAs aprobados (verbo + beneficio, según el estilo: editorial usa CTAs cortos y punzantes; warm usa CTAs cálidos; tech usa CTAs precisos).
- Microcopy de errores y loading **con personalidad** del estilo.
- Lista de CTAs prohibidos.
- Idioma primario y secundario.

### 2 · Identidad visual y mood
- Logo asset y variantes.
- Mood adjetivos del brief (3 max).
- Modo (light/dark/dual) — el brief sugiere; el cliente confirma.
- Inspiraciones del catálogo de estilo (las del `references/visual-styles.md` correspondiente).

### 3 · Paleta cromática (oklch nativo)

**Bias del estilo**:
- **Editorial Dramatic**: paper warm + tinta + acento editorial saturado.
- **Kinetic Cinematic**: dual con dominancia dark + 1 acento eléctrico.
- **Glassmorphic Luxury**: pasteles muy suaves + acentos translúcidos + champagne.
- **Neo-Vivid**: 2-3 saturados conviviendo + mesh.
- **Brutalist Bold**: mono puro + 1 acento desafiante.
- **Organic Warm**: cream/beige base + terracotta/olive + tinta cálida.
- **Dark Tech**: grafito + neon (verde/cyan) + mono UI.
- **Retro Futurism**: magenta + cyan + amarillo CRT.
- **Maximalist Layered**: 4-5 fuertes con sistema de jerarquía.
- **Minimal Refined** (excepción): casi mono + 1 acento sobrio.

Tokens estándar a producir:

```css
@theme {
  /* Surfaces */
  --color-bg-base: oklch(...);
  --color-bg-elevated: oklch(...);
  --color-bg-overlay: oklch(0% 0 0 / 0.55);

  /* Text */
  --color-fg-primary: oklch(...);
  --color-fg-secondary: oklch(...);
  --color-fg-muted: oklch(...);
  --color-fg-on-accent: oklch(...);

  /* Brand */
  --color-accent-primary: oklch(...);
  --color-accent-hover: oklch(...);
  --color-accent-active: oklch(...);
  --color-accent-subtle: oklch(...);

  /* Decorative (estilos impactantes pueden tener) */
  --color-accent-secondary: oklch(...);  /* opcional según estilo */

  /* Semantic */
  --color-success / --color-warning / --color-danger / --color-info

  /* Borders */
  --color-border-subtle / --color-border-strong / --color-border-accent
}
```

**Pares de contraste validados WCAG AA** documentados.
**Variantes dark si modo dual** declaradas.

### 4 · Tipografía

Bias por estilo:
- **Editorial Dramatic**: serif editorial bold (PP Editorial New, Tiempos, Migra) display + sans body.
- **Kinetic Cinematic**: sans variable bold (Inter Display, Geist, Söhne Breit) + mono accent.
- **Glassmorphic Luxury**: sans elegante light/regular (Söhne, Geist, Neue Haas).
- **Neo-Vivid**: sans geométrica con personalidad (Geist, Outfit, Sora) ± display alternativo.
- **Brutalist Bold**: oversized sans bold + condensed mix (PP Editorial Old, GT Sectra, NaN Tundra).
- **Organic Warm**: serif elegante + cursiva manuscrita opcional (Recoleta, BluuNext) para acentos.
- **Dark Tech**: mono prominente (Berkeley Mono, JetBrains Mono, Geist Mono) + sans sober.
- **Retro Futurism**: pixel/distorted display (PP Mondwest, NaN Holo, VT323) + sans clean body.
- **Maximalist Layered**: 2-3 familias mezcladas con propósito.
- **Minimal Refined**: 1 sola familia, pocos weights.

Producir:
```css
@theme {
  --font-display: ...;
  --font-body: ...;
  --font-mono: ...;  /* si aplica */

  /* Escala modular según estilo (1.25 default; 1.333 para editorial/dramatic; 1.5 para brutalist) */
  --text-xs ... --text-7xl

  /* Line heights canónicos del set, NUNCA decimales libres */
  --leading-heading: 1.1;
  --leading-tight: 1.25;
  --leading-body: 1.6;
  --leading-loose: 1.8;

  /* Letter spacing */
  --tracking-tight: -0.04em;
  --tracking-normal: 0;
  --tracking-wide: 0.02em;
}
```

Reglas: máximo 2-3 familias; weights del set (300/400/500/600/700/800/900) según estilo.

### 5 · Espaciado y grid

- Escala 4px o 8px estricta (4 default).
- Containers max-width por breakpoint.
- Section padding mobile vs desktop (los estilos editoriales/brutalist usan padding generoso `--space-32` o más).
- Border radius escalado:
  - Glassmorphic Luxury / Neo-Vivid → radius generoso (12-28px).
  - Brutalist Bold / Dark Tech → radius 0 o muy chico.
  - Organic Warm → radius generoso + algunas formas blob.
  - Editorial Dramatic → radius pequeño-medio (4-8px).

Tokens shadow según estilo (cero shadows en Brutalist, dramáticas en Editorial, suaves en Glass).

### 6 · Motion canónico y estados de UI

**Duraciones canónicas**:
```css
--duration-fast: 150ms;
--duration-base: 250ms;
--duration-slow: 400ms;
--duration-page: 600ms;
--duration-cinematic: 900ms;  /* para Kinetic, Editorial */
```

**Easings**:
```css
--ease-standard: cubic-bezier(0.2, 0, 0, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-cinematic: cubic-bezier(0.7, 0, 0.3, 1);  /* para storytelling */
```

**Estados obligatorios** por interactivo:
default / hover / focus-visible / active / disabled / loading / error / success.

**Skeletons**, **toasts**, **scroll behavior** (Lenis activado por default en estilos cinemáticos).

**`prefers-reduced-motion`** respetado siempre con fallback estático declarado por componente.

### Componentes autorizados (whitelist por proyecto)

Documentar explícitamente:
- shadcn primitives autorizados.
- Librerías UI premium permitidas (Aceternity, Magic UI, Cult UI, etc.) según el estilo del brief.
- Iconografía (lucide default; reemplazar por set custom si Editorial/Brutalist lo requiere).
- Librerías motion (FM default; GSAP solo si el estilo lo justifica).

### Patrones de página

Documentar para CADA tipo de sección:
- Hero (qué receta del catálogo se va a usar como base).
- Forms.
- Empty states.
- Error pages.
- Estados de loading.

## Plantilla de output

Generar `docs/UI-SPEC.md` siguiendo el template `templates/gsd/UI-SPEC.md` pero:

1. Reemplazar tokens por los del estilo elegido (no los placeholder del template).
2. Cambiar la sección de mood adjetivos por los del CURATED-BRIEF.
3. Sumar una sección `## 0 · Style fingerprint` al inicio:
   ```markdown
   ## 0 · Style fingerprint
   primary_style: <del catálogo>
   tier: impact-first | balanced | minimal (con justificación si minimal)
   alternative_style: <de fallback>
   reference_sites_studied: [...]
   ```

## Constraints / Do NOT

- NO defaultear a oklch low-saturation pastel "seguro". Si el estilo es Kinetic, el acento DEBE ser eléctrico. Si es Brutalist, el contraste DEBE ser duro.
- NO definir más de 3 familias tipográficas (el límite duro sigue, salvo Maximalist).
- NO usar `outline: none` sin reemplazo `:focus-visible` (regla universal independiente del estilo).
- NO permitir `line-height` decimal aleatorio (sigue siendo del set canónico).
- NO incluir colores fuera del set; si el agente quiere uno nuevo, debe agregarse al spec primero.
- NO firmar el spec si no pasó `checklists/ui-spec-checklist.md` adaptado al estilo.

## Few-Shot Example

**Input** (`CURATED-BRIEF.md`):
```yaml
primary_style: Kinetic Cinematic
mood_adjectives: [audaz, narrativo, futuro]
emotional_register: visionario
```

**Output esperado** (extracto del UI-SPEC generado):

```css
@theme {
  /* Kinetic Cinematic — dark dominante con acento eléctrico */
  --color-bg-base: oklch(8% 0.01 250);
  --color-bg-elevated: oklch(12% 0.01 250);
  --color-fg-primary: oklch(96% 0.005 250);
  --color-fg-muted: oklch(70% 0.005 250);
  --color-accent-primary: oklch(72% 0.22 45);   /* amber eléctrico */
  --color-accent-hover: oklch(78% 0.22 45);
  --color-accent-secondary: oklch(70% 0.20 200); /* electric blue */

  --font-display: "Geist Variable", "Inter Display", sans-serif;
  --font-body: "Geist", "Inter", sans-serif;
  --font-mono: "Geist Mono", "JetBrains Mono", monospace;

  --text-5xl: 4rem;
  --text-6xl: 5.5rem;
  --text-7xl: 7rem;  /* hero brutal */

  --leading-heading: 1.05;  /* dramáticamente cerrado */
  --tracking-tight: -0.04em;

  --duration-cinematic: 900ms;
  --ease-cinematic: cubic-bezier(0.7, 0, 0.3, 1);
}
```

Nada de `oklch(99%, 0.005, 250)` aburrido. El sitio se ve desde la primera línea.
