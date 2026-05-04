---
name: magic-section-designer
description: Aplica recetas mágicas concretas a cada sección del sitio (hero, features, testimonios, pricing, FAQ, CTA, etc.) consumiendo el blueprint de CURATED-BRIEF.md y el catálogo de section-recipes.md. Genera el código de la sección con la receta correcta para el estilo visual elegido, integrando librerías premium específicas. Activar cuando se va a implementar una sección visual, después de que ui-spec-author dejó los tokens listos, y antes/durante vibe-design-pipeline. Usar también cuando el usuario diga "construyamos el hero", "hagamos esta sección", "necesito que esta parte sea memorable", "agreguemos magia visual", o cuando trabaje sobre una sección y la salida actual se vea genérica.
---

# Magic Section Designer

## Por qué existe

Sin esta skill, el agente cae en hero genérico, pricing de tres cards iguales, testimonials con foto stock y CTAs que dicen "Empezar". El sitio queda funcional y olvidable.

Esta skill toma una receta concreta del catálogo, la aplica al estilo del proyecto, y produce código con la implementación correcta de las librerías necesarias. Es la diferencia entre "una sección que funciona" y "una sección que hace que el visitante saque captura para mostrar".

## Cuándo activar

- Después de que `business-research-curator` dejó `docs/CURATED-BRIEF.md` con el blueprint sección-por-sección.
- Después de `ui-spec-author` dejó tokens.
- Antes de implementar cada sección importante.
- Cuando el usuario te dice "esta sección quedó genérica, hagámosla mágica".

## Pre-requisitos

1. `docs/CURATED-BRIEF.md` con blueprint poblado por `business-research-curator`.
2. `docs/UI-SPEC.md` con tokens del estilo elegido.
3. Stack instalado con las librerías de la receta (si falta alguna, frenar y pedir instalación).

## Instrucciones operativas

### Fase 1 · Identificar la sección y la receta

1. Leer `docs/CURATED-BRIEF.md`, sección `## 7. Blueprint sección por sección`.
2. Identificar la sección que el usuario está pidiendo construir.
3. Anotar:
   - `treatment` (id de receta).
   - `libraries` declaradas.
   - `intensity`.
   - `a11y_consideration`.
   - `performance_budget`.
4. Leer la receta correspondiente en `references/section-recipes-detailed.md` (este skill bundle) o consultar el catálogo en `business-research-curator/references/section-recipes.md`.

### Fase 2 · Validar coherencia

- ¿La receta encaja con el estilo visual del UI-SPEC? Si no, frená y discutí con el usuario antes de implementar.
- ¿Las librerías necesarias están instaladas? Si no, listalas y pedí permiso para instalar.
- ¿La intensidad es coherente con la sección anterior y siguiente? (regla: una "estrella" por viewport).

### Fase 3 · Implementar la receta

Construir el componente con:

1. **Estructura semántica** (`<section>` con `aria-labelledby`).
2. **Tokens del UI-SPEC** (cero hex hardcoded).
3. **Librerías exactas** de la receta — sin sumar otras.
4. **Estados completos** (loading si aplica, reduced-motion fallback).
5. **Performance hooks**: lazy-load assets pesados, `whileInView` para animaciones.
6. **Cero magic numbers**.

### Fase 4 · Cerrar la pasada con audit ligera

Antes de declarar la sección lista:
- Ejecutar mentalmente el checklist de `motion-polish` y `a11y-audit` aplicado a esta sección.
- Verificar `performance_budget` declarado en el blueprint.
- Documentar en `STATE.md` la receta aplicada con timestamp.

## Recetas en detalle (lectura bajo demanda)

El catálogo completo está en `references/section-recipes-detailed.md` con código de ejemplo, props recomendadas, y casos de fallo. **Solo leerlo cuando se va a aplicar una receta nueva, no preventivamente**.

### Quick reference para hero (las 10 recetas A.X)

Cuando el blueprint pide una receta de hero, identificar el id (`A.1` a `A.10`) y leer la sección correspondiente en el catálogo. Recordar: la receta dicta la implementación pero el contenido (copy, imagen, mockup) viene del usuario o del CMS.

## Encadenamiento con otras skills

```
CURATED-BRIEF.md (de business-research-curator)
   blueprint.sections[]
        ↓
[magic-section-designer] aplica receta
        ↓
   componente generado
        ↓
[stylistic-audit] valida tokens
        ↓
[a11y-audit] valida WCAG AA
        ↓
[performance-audit] valida budget
        ↓
[motion-polish] afina motion
        ↓
   sección USD 25K
```

## Patrones de implementación recurrentes

### Reveal on scroll con FM (default para todo)

```tsx
import { motion } from "framer-motion";
const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0, 0, 1] } },
};
<motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={reveal}>
  ...
</motion.section>
```

### Fallback reduced-motion

```tsx
import { useReducedMotion } from "framer-motion";
const reduce = useReducedMotion();
{reduce ? <StaticVersion /> : <AnimatedVersion />}
```

### Lazy-load 3D / video heavy

```tsx
import dynamic from "next/dynamic";
const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => <HeroPosterFallback />,
});
```

### Aurora background (Glassmorphic Luxury, Neo-Vivid)

```tsx
import { AuroraBackground } from "@/components/ui/aurora-background";
<AuroraBackground>
  <h1>...</h1>
  <p>...</p>
  <Button>...</Button>
</AuroraBackground>
```

### Marquee infinito (Brutalist, Editorial, Maximalist)

```tsx
import { Marquee } from "@/components/ui/marquee";
<Marquee pauseOnHover speed={50} className="py-12">
  {logos.map(l => <img src={l.src} alt={l.alt} className="h-8 grayscale opacity-60 hover:opacity-100 hover:grayscale-0" />)}
</Marquee>
```

### Magnetic CTA (cualquier estilo de impacto)

```tsx
import { MagneticButton } from "@/components/ui/magnetic-button";
<MagneticButton onClick={...}>
  Empezar ahora →
</MagneticButton>
```

## Constraints / Do NOT

- NO inventar una receta nueva sin que esté en el catálogo. Si pensás una mejor, primero proponela al usuario y, si aprueba, sumarla a `section-recipes.md` con un id nuevo.
- NO mezclar 2 recetas en una misma sección. Una sección, una receta.
- NO sumar librerías además de las que la receta declara — sin permiso explícito.
- NO saltarse el fallback reduced-motion ni los considerandos a11y de la receta.
- NO usar la sección como excusa para mostrar todas las librerías premium del stack. Restraint.
- NO firmar la sección como done sin que pase la pasada `motion-polish` y `a11y-audit`.

## Few-Shot Example

**Pedido del usuario**: "Construyamos el hero. Está en CURATED-BRIEF.md como A.4."

**Salida correcta del agente**:

> Activando magic-section-designer.
>
> Leí el blueprint:
> - id: hero
> - treatment: A.4 hero-beam-spotlight-dark
> - libraries: aceternity-ui (Spotlight, Sparkles), magic-ui (animated beam), framer-motion
> - intensity: alta
> - a11y_consideration: reduced-motion fallback con beam estático
> - performance_budget: LCP ≤ 1.5s mobile
>
> Verifico que las librerías estén instaladas... aceternity-ui ✓, magic-ui ✓, framer-motion ✓.
>
> Voy a generar el componente `Hero.tsx` con:
> - Section dark con `bg-[var(--color-bg-base)]`.
> - Beam animado de `magic-ui` posicionado top-center.
> - Sparkles capa sutil con density 30.
> - Headline con FM stagger word-by-word.
> - CTA primario con shimmer sutil.
> - Fallback reduced-motion: beam estático SVG, sparkles ocultos, headline sin stagger.
> - LCP-friendly: el beam es Canvas pero deferreado post-paint.
>
> ¿OK?
