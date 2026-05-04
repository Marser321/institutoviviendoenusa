---
name: a11y-audit
description: Auditoría de accesibilidad WCAG AA sobre componentes, páginas y flujos. Verifica navegación por teclado, contraste, ARIA, focus management, prefers-reduced-motion y soporte screen reader. Es la pasada 3 de vibe-design-pipeline. Bloqueante si Lighthouse A11y < 95.
---

# A11y Audit

## Objetivo
Asegurar que el componente cumple WCAG 2.2 AA. La accesibilidad no es opcional para webs de USD 25K — es contractual y, en algunos países, legal. Sin esta pasada, el LLM produce UIs que se ven bien en Chrome desktop y son inutilizables con teclado o screen reader.

## Cuándo activar
- Después de `stylistic-audit`.
- Antes de cualquier deploy a staging.
- Cuando el usuario reporta "no se puede usar con teclado".

## Auditoría — los 8 dominios

### 1 · Estructura semántica
- [ ] Un único `<h1>` por página/route.
- [ ] Jerarquía de headings sin saltos (`h1 → h2 → h3`, no `h1 → h4`).
- [ ] Landmarks correctos: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`.
- [ ] Listas reales con `<ul>`/`<ol>`/`<li>` (no `<div>`).

### 2 · Roles y atributos ARIA
- [ ] Usar HTML semántico **antes** que ARIA (`<button>` siempre supera a `<div role="button">`).
- [ ] `aria-label` solo cuando el texto visible no alcanza.
- [ ] `aria-labelledby` para asociar regiones a su heading.
- [ ] `aria-describedby` para errores de form y descripciones.
- [ ] `aria-live="polite"` para toasts, `assertive` solo en errores críticos.
- [ ] `aria-current="page"` en nav activo.
- [ ] `aria-expanded` y `aria-controls` en disclosure (acordeones, dropdowns).
- [ ] No abusar: cero ARIA redundante con HTML semántico.

### 3 · Navegación por teclado
- [ ] Todo flujo crítico operable solo con teclado (Tab, Shift+Tab, Enter, Space, Esc, flechas).
- [ ] Tab order coincide con el orden visual.
- [ ] Sin "trampas" (e.g., modal sin focus return).
- [ ] Skip link "Saltar al contenido" en páginas largas.
- [ ] Focus management en SPA tras navegación.

### 4 · Focus visible
- [ ] CADA elemento interactivo tiene `:focus-visible` claramente diferenciable.
- [ ] Outline o ring custom usa tokens del spec (no default browser).
- [ ] Contraste del focus ring ≥ 3:1 contra el fondo adyacente.
- [ ] No usar `outline: none` sin reemplazo.

### 5 · Contraste de color
- [ ] Texto < 18px regular: ratio ≥ 4.5:1.
- [ ] Texto ≥ 18px o ≥ 14px bold: ratio ≥ 3:1.
- [ ] Iconos y bordes funcionales: ratio ≥ 3:1.
- [ ] Validar pares en light Y dark mode.

### 6 · Imágenes y multimedia
- [ ] `alt` significativo en imágenes informativas; `alt=""` en decorativas.
- [ ] Video con captions (VTT) y transcript si aplica.
- [ ] Audio con transcript.
- [ ] Charts con `aria-label` describiendo el dato (no "chart").
- [ ] Iconos sin texto: `aria-label` o `<title>` en SVG.

### 7 · Forms y errores
- [ ] Cada `<input>` con `<label>` asociado (no placeholder como label).
- [ ] Mensajes de error vinculados con `aria-describedby` y `aria-invalid="true"`.
- [ ] Resumen de errores al inicio del form si hay > 3.
- [ ] Validación accesible (no solo color, también ícono + texto).
- [ ] Autocomplete attributes (`autocomplete="email"`, etc.).

### 8 · Motion y prefers-reduced-motion
- [ ] Respetar `@media (prefers-reduced-motion: reduce)`.
- [ ] Animaciones de scroll, parallax, autoplay video → desactivables.
- [ ] Ningún flash > 3 veces por segundo (epilepsia).
- [ ] Carruseles con pausa visible.

## Verificación automatizada

Ejecutar y reportar:
```bash
# axe-core en CI
pnpm dlx @axe-core/cli http://localhost:3000/<route>

# Lighthouse local
pnpm dlx lighthouse http://localhost:3000/<route> --only-categories=accessibility

# eslint-plugin-jsx-a11y
pnpm lint
```

Bloquear merge si:
- axe-core encuentra **cualquier** violation severity `serious` o `critical`.
- Lighthouse A11y < 95.
- jsx-a11y produce errores (warnings tolerables solo si justificados).

## Output del audit

Agregar a `STATE.md`:

```markdown
## a11y · <route> · YYYY-MM-DD
- axe-core: 0 critical, 0 serious, 1 minor (heading-skip en hero — corregido)
- Lighthouse A11y: 97
- jsx-a11y: 0 errors, 2 warnings (justified)
- Manual checks:
  - Keyboard nav: ✅ full flow Tab→Esc, focus return correcto
  - Screen reader: ✅ NVDA leyó nav y form correctamente
  - Reduced motion: ✅ animaciones desactivadas con prefers-reduced
- Pendiente: contraste del placeholder en form de contacto (3.8:1, target 4.5:1)
```

## Constraints / Do NOT

- NO bypassear con `eslint-disable jsx-a11y` para pasar lint.
- NO usar solo color para indicar estado (error, success). Acompañar con icono + texto.
- NO "lo arreglo después". Si la pasada falla, se reabre y se cierra antes de seguir.
- NO usar libraries premium sin verificar A11y; muchas componentes copy-paste de Aceternity/Magic UI vienen con problemas.
- NO confiar 100% en herramientas automatizadas; el manual check con teclado y screen reader es obligatorio en flujos críticos (auth, checkout).
