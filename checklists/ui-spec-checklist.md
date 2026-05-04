# UI-SPEC CHECKLIST

> Para validar que el `UI-SPEC.md` está listo para alimentar la pipeline de diseño. Sin esto firmado, no se genera código visual.

---

## Copywriting

- [ ] Tono de voz definido en 3 adjetivos.
- [ ] Persona/audiencia descrita.
- [ ] Lista de CTAs aprobados.
- [ ] Lista de CTAs prohibidos.
- [ ] Plantilla de mensajes de error humanos.
- [ ] Plantilla de loading copy contextual.
- [ ] Idioma primario y secundario declarados.

## Identidad

- [ ] Logo SVG + variantes light/dark/iso.
- [ ] Padding mínimo del logo.
- [ ] Mood adjetivos (3 max) definidos.
- [ ] Modo (light/dark/dual) confirmado con cliente.
- [ ] 2-4 referencias visuales con justificación.

## Paleta

- [ ] Tokens nombrados (`--color-bg-base`, `--color-fg-primary`, etc.).
- [ ] Valores en `oklch()` (no solo hex).
- [ ] Pares de contraste WCAG AA validados (≥ 4.5:1 texto, ≥ 3:1 UI).
- [ ] Variantes para light Y dark si es dual.
- [ ] Colores semánticos (success/warning/danger/info) definidos.
- [ ] Bordes (`--color-border-subtle/strong`) declarados.

## Tipografía

- [ ] Máximo 2 familias.
- [ ] Self-hosting confirmado (Fontsource o equivalente).
- [ ] Escala modular base 1.25 o 1.333 declarada.
- [ ] Line-heights canónicos del set (1.1 / 1.25 / 1.6 / 1.8).
- [ ] Letter-spacing definido para headings grandes.
- [ ] Pesos permitidos (no más de 4: 400/500/600/700).
- [ ] Sin "magic" line-heights decimales.

## Espaciado

- [ ] Escala 4px o 8px estricta.
- [ ] Containers max-width por breakpoint.
- [ ] Section padding mobile vs desktop.
- [ ] Border radius en escala (`--radius-sm/md/lg/xl/full`).
- [ ] Shadows en escala (`--shadow-sm/md/lg`).

## Estados de interfaz

- [ ] 7 estados definidos para CADA componente interactivo:
  - default
  - hover
  - focus-visible
  - active
  - disabled
  - loading
  - error
  - (success cuando aplica)
- [ ] Patrón de focus visible declarado (outline o ring + offset + color token).
- [ ] Cero `outline: none` sin reemplazo.

## Motion

- [ ] Duraciones canónicas (`--duration-fast/base/slow`).
- [ ] Easing canónicos (`--ease-standard/spring/out/in`).
- [ ] Reglas de motion: máximo 600ms, respeto a reduced-motion.
- [ ] Skeleton loading patrón documentado.
- [ ] Toast position + duración default.

## Componentes autorizados

- [ ] shadcn/ui primitives listados.
- [ ] Lib UI premium permitidas (Aceternity, Magic UI, etc.) explicitada.
- [ ] Lib UI prohibidas mencionadas.
- [ ] Iconografía (lucide-react) declarada.

## Patrones de página

- [ ] Estructura de Hero (H1 length, CTA count, trust bar).
- [ ] Estructura de Form (label, error, submit loading).
- [ ] Estructura de Empty state.
- [ ] Estructura de Error pages (404, 500).

---

## Validación final del UI-SPEC

Antes de firmar:

- [ ] Tokens implementables: el agente puede generar `tokens.css` desde el spec sin ambigüedad.
- [ ] Cliente lo aprobó por escrito (email o doc firmado).
- [ ] No hay contradicciones internas (paleta dice una cosa, ejemplo dice otra).
- [ ] Es **cuantitativo**, no descriptivo. ("Tipografía elegante" no sirve; "Inter Display + Inter, escala 1.25" sí).

---

*El UI-SPEC firmado es el escudo contra "esto no era lo que pedí" después de 10 días de código.*
