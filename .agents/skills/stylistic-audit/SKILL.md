---
name: stylistic-audit
description: Auditoría de revestimiento estilístico que fuerza la adherencia absoluta al UI-SPEC.md y elimina elementos browser-default, magic numbers, hex sueltos, line-heights arbitrarios y dependencias UI no aprobadas. Es la pasada 2 de vibe-design-pipeline.
---

# Stylistic Audit

## Objetivo
Convertir la fundación en la versión visualmente correcta y consistente con el sistema de diseño. Esta pasada evita el problema clásico del LLM que mezcla 3 paletas y 4 tipografías en el mismo componente.

## Cuándo activar
- Inmediatamente después de `frontend-foundation`.
- Antes de cualquier merge de un componente nuevo.
- Cuando importás algo de v0/Lovable a tu repo.

## Pre-requisitos
- `UI-SPEC.md` y `tokens.css` cargados.
- Componente con HTML semántico ya existente.

## Auditoría — checklist exhaustivo

### A · Tokens
- [ ] Cero hex/rgb/oklch hardcoded en JSX o CSS. Todo via `var(--token)` o clase Tailwind mapeada.
- [ ] Cero `text-[14.5px]`, `mt-[13px]`, `gap-[7px]`. Si la escala no alcanza, **proponer ampliar el spec** antes de meter magic number.
- [ ] Border radius desde `--radius-*`.
- [ ] Sombras desde `--shadow-*`.
- [ ] Duraciones de animación desde `--duration-*`.

### B · Tipografía
- [ ] Cero `font-family` distinta a las 2 declaradas en spec.
- [ ] `line-height` SOLO desde el set canónico (heading 1.1 / body 1.6 / micro 1.4).
- [ ] `font-weight` desde escala definida (400/500/600/700).
- [ ] `letter-spacing` solo en headings grandes con valor del spec.
- [ ] Tamaños desde la escala modular; sin `text-[18px]` random.

### C · Elementos browser-default eliminados
- [ ] `<button>` reemplazado por `<Button>` (shadcn/Radix).
- [ ] `<input>`/`<textarea>` con estilos del sistema, no defaults.
- [ ] `<select>` reemplazado por `<Select>` headless.
- [ ] `<a>` con clases del spec, no underline azul default.
- [ ] `<ul>`/`<ol>` con bullets/numbering custom o eliminados.
- [ ] Scrollbars custom donde haga sentido (no obligatorio).

### D · Estados de interfaz (los 7)
Para cada elemento interactivo verificar que existen:
- [ ] default
- [ ] hover
- [ ] focus-visible (con outline o ring del spec, NUNCA `outline: none` solo)
- [ ] active (pressed)
- [ ] disabled (con cursor-not-allowed + opacidad/contraste correcto)
- [ ] loading (skeleton, spinner del spec)
- [ ] error (input, validación)

### E · Imagen y assets
- [ ] Imágenes con `next/image`, `astro:assets`, o equivalente.
- [ ] `aspect-ratio` declarado para evitar CLS.
- [ ] `alt` con sentido (no `"image"` ni vacío sin razón decorativa).
- [ ] SVGs inline si son íconos pequeños; archivo si grandes.

### F · Dependencias UI premium
- [ ] Si el componente importa de una librería UI premium (Aceternity, Magic UI, etc.), verificar que está autorizada en `UI-SPEC.md` para este proyecto.
- [ ] Si hay 2 librerías premium mezcladas en el mismo componente, refactor: una por unidad.
- [ ] Si la librería trae estilos propios, sobrescribirlos con tokens del spec.

### G · Modo oscuro / dual mode (si aplica)
- [ ] Tokens duales declarados (light + dark).
- [ ] Componente respeta `prefers-color-scheme` o toggle del usuario.
- [ ] Imágenes y SVGs con variantes para dark cuando el contraste sufre.

## Outputs

Producir al cerrar la pasada:
1. Diff explícito de qué cambió respecto al output de `frontend-foundation`.
2. Lista de **violations encontradas y corregidas** (incluso si son "menores"):
   ```
   Violations corregidas:
   - reemplazado #f3f4f6 por var(--color-bg-elevated)
   - line-height 1.37 → 1.6 (body)
   - <select> nativo → <Select> shadcn
   - magic gap-[13px] → space-3
   ```
3. Si hay violations que NO se pudieron corregir (e.g., spec incompleto), agregarlas a `STATE.md` como `<issue>` y bloquear la pasada.

## Constraints / Do NOT

- NO "casi" pasar el audit. Cero violations, o se reabre la pasada.
- NO ampliar el UI-SPEC unilateralmente; si falta un token, pedir aprobación humana.
- NO mezclar Tailwind config + estilos inline + CSS variables; la regla es **Tailwind classes que mapean a tokens**.
- NO desactivar reglas de eslint-plugin-tailwindcss para escapar el audit.
- NO permitir `!important` salvo edge case justificado y documentado.
