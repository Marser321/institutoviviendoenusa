---
name: vibe-design-pipeline
description: Orquestación de la tubería de refinamiento Vibe Designing en 5 pasadas (foundation, stylistic, a11y, performance, motion-polish) sobre cualquier sección, página o pantalla. Activar después de UI-SPEC.md y antes de cerrar cualquier deliverable visual destinado a producción.
---

# Vibe Design Pipeline

## Objetivo
Convertir un mockup, prompt o boceto en un componente listo para producción mediante 5 pasadas determinísticas, cada una con un foco único. Generar UI premium con un solo prompt es una fantasía: el resultado USD 25K viene de la disciplina de la pipeline.

## Cuándo activar
- Después de tener `UI-SPEC.md` aprobado.
- Sobre cada sección/pantalla que cierre el `PLAN.md`.
- Antes del deploy final, como último gate de calidad.

## Pre-requisitos
- `UI-SPEC.md` aprobado por usuario.
- Tokens cargados (`@theme` o `tokens.css`).
- Stack base instalado (`templates/stacks/<elegido>/`).

## La Pipeline (orden inalterable)

### Pasada 1 · Foundation (DOM + Estado)
**Skill delegada**: `frontend-foundation`

Generar **solo** la topología estructural:
- Estructura semántica (header/main/section/article/footer).
- Componentes wireframed sin estilos finales (usando tokens del UI-SPEC).
- Estado UI con Zustand si hay interacción no trivial.
- Server Actions / API routes mínimas para data.

**Verificación**: el componente renderiza, pasa typecheck, no usa `any`, no tiene estilos inline.

---

### Pasada 2 · Stylistic Audit (revestimiento)
**Skill delegada**: `stylistic-audit`

Imponer adherencia absoluta a `UI-SPEC.md`:
- Reemplazar cualquier hex/rgb suelto por tokens.
- Forzar familia tipográfica del spec.
- Validar escalas de tamaño, espaciado, line-height.
- Eliminar elementos browser-default (botón pelado, input nativo, focus-ring browser).
- Eliminar dependencias no aprobadas en este componente.

**Verificación**: diff visual contra el spec; cero "magic numbers".

---

### Pasada 3 · A11y Audit
**Skill delegada**: `a11y-audit`

Asegurar conformidad WCAG AA:
- Roles/labels ARIA correctos.
- Navegación por teclado completa, sin trampas.
- Focus visible en cada interactivo.
- Contrastes validados.
- Alt text en imágenes con sentido (no `"image"`).
- Texto escalable (no `font-size` fixed en px críticos).
- `prefers-reduced-motion` respetado.

**Verificación**: `axe-core` en verde + Lighthouse A11y >= 95.

---

### Pasada 4 · Performance Audit
**Skill delegada**: `performance-audit`

Triage de rendimiento:
- Imágenes via `next/image` o `astro:assets`, formatos modernos (avif/webp).
- Fonts self-hosted con `font-display: swap`.
- Lazy-load de secciones below-the-fold.
- Bundle analyzer: cualquier dep > 50kb sin justificación se cuestiona.
- Identificar y cortar re-renders innecesarios (Million.js si aplica).
- LCP/CLS/INP medidos contra el budget.

**Verificación**: Lighthouse Performance >= 90 mobile y >= 95 desktop. CLS < 0.05. INP < 200ms.

---

### Pasada 5 · Motion Polish
**Skill delegada**: `motion-polish`

Solo si el UI-SPEC habilita motion:
- Animaciones de entrada coherentes con la duración/easing canónicos del spec.
- Respeto a `prefers-reduced-motion`.
- Transformaciones GPU-friendly (`transform`, `opacity`); evitar layout thrashing.
- Sincronización: scroll-triggered con Lenis, secuencias coherentes con Framer Motion.
- Sin animar > 1 librería por unidad funcional.

**Verificación**: scroll a 60fps en Chrome DevTools throttled (4× CPU). Sin "jank" visible.

## Output esperado al cerrar cada pasada

Al cerrar cada pasada agregar a `STATE.md`:

```markdown
## YYYY-MM-DD HH:MM · Vibe Pipeline · <component>
- [P1 foundation] done
- [P2 stylistic]  done
- [P3 a11y]       Lighthouse A11y 96, axe-core 0 issues
- [P4 perf]       LCP 1.4s, CLS 0.02, INP 120ms
- [P5 motion]     done; reduced-motion respetado
- artefactos: screenshots/Sec-Hero-{light,dark,mobile}.png
```

## Constraints / Do NOT

- NO ejecutar pasadas en paralelo. Es secuencial estricto.
- NO saltarte pasadas "porque parece bien". El humano se equivoca; la pipeline no.
- NO generar 3 componentes en una sola pipeline. Una pipeline = un componente o sección.
- NO permitir que P5 (motion) tape problemas de P3 (a11y) o P4 (perf).
- NO usar UI generada en v0/Lovable/Bolt sin pasarla por las 5 pasadas, **especialmente** P3 y P4.

## Few-Shot Example

**Input**: Hero section de landing premium con background animado.

**Pipeline trace**:
1. **P1 foundation**: `<section><h1>...</h1><p>...</p><Button/></section>`, sin estilos.
2. **P2 stylistic**: aplica tokens `--color-fg-primary`, `--text-5xl`, `--space-16`. Reemplaza Button por shadcn Button variant `accent`.
3. **P3 a11y**: agrega `aria-labelledby`, asegura tab order, contrast check. Reduce hero font-size escalable.
4. **P4 performance**: hero background usa `next/image` priority, video poster, lazy-load secciones siguientes, font preload.
5. **P5 motion**: agrega `motion.h1` con stagger reveal de 250ms, beam de Aceternity con `prefers-reduced-motion` fallback.

Resultado: pasa de "hero genérico de IA" a hero USD 25K.
