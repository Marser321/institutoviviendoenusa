---
name: motion-polish
description: Pasada final de pulido cinemático que aplica animaciones, transiciones y micro-interacciones de calidad agencia, manteniendo performance 60fps y respetando prefers-reduced-motion. Es la pasada 5 de vibe-design-pipeline. Solo activar en proyectos donde el UI-SPEC habilita motion.
---

# Motion Polish

## Objetivo
Convertir un sitio "funcional + estilizado" en uno "vivo + memorable". El motion bien hecho no es decoración — es el lenguaje que transmite jerarquía, feedback y confianza. Mal hecho mata performance y accesibilidad.

## Reglas axiales del motion

1. **Una librería por unidad funcional**. Framer Motion XOR GSAP por componente.
2. **GPU-only properties**: animar solo `transform`, `opacity`, `filter`. Cero `width`/`height`/`top`/`left` en motion path.
3. **Duración del UI-SPEC**, sin excepciones (`--duration-fast/base/slow`).
4. **Easing canónico** (`--ease-standard`), nunca `linear` salvo loops.
5. **Reduced motion**: respetar `prefers-reduced-motion` con fallback estático.
6. **60fps mandatorio** en mobile mid-range (Pixel 6 / iPhone 12 baseline).

## Tipos de motion (recetas)

### A · Reveal on scroll
```tsx
import { motion } from "framer-motion";
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
>
  …
</motion.div>
```

### B · Smooth scroll global
```tsx
// app/(marketing)/layout.tsx
"use client";
import Lenis from "lenis";
useEffect(() => {
  const lenis = new Lenis({ smoothWheel: true, lerp: 0.1 });
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  return () => lenis.destroy();
}, []);
```

### C · Stagger children
```tsx
const container = { animate: { transition: { staggerChildren: 0.08 } } };
const item = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };
<motion.ul variants={container} initial="initial" animate="animate">
  {items.map((i) => <motion.li key={i.id} variants={item}>...</motion.li>)}
</motion.ul>
```

### D · Hover/press micro-interactions
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
>
```

### E · GSAP ScrollTrigger (cuando FM no alcanza)
```tsx
useEffect(() => {
  if (!ref.current) return;
  const ctx = gsap.context(() => {
    gsap.to(".pin-target", {
      scrollTrigger: { trigger: ref.current, pin: true, start: "top top", end: "+=600" },
      x: -300,
    });
  }, ref);
  return () => ctx.revert();
}, []);
```

### F · Layout transitions
```tsx
<motion.div layout transition={{ duration: 0.25 }}>...</motion.div>
```

### G · Reduced motion
```tsx
import { useReducedMotion } from "framer-motion";
const reduce = useReducedMotion();
<motion.div animate={reduce ? {} : { y: -10 }} />
```

O via CSS:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Auditoría — checklist motion

- [ ] Cero animación durando > 600ms (excepto reveal compuesto).
- [ ] Cero `setInterval` para animar; siempre `requestAnimationFrame` o lib.
- [ ] Cero `animation-delay` cascadeando > 800ms total.
- [ ] Cero parallax o sticky sin Lenis o `transform`.
- [ ] Cero motion en formularios mid-fill.
- [ ] Reduced-motion testeado activando la flag de OS.
- [ ] Performance: animations panel de Chrome DevTools muestra 60fps.
- [ ] Cero "layout thrash" en scroll (medido con Performance tab).

## Patrones desaconsejados

- ❌ Auto-playing videos > 5s sin control de pausa.
- ❌ Carruseles que avanzan solos sin pausa al hover.
- ❌ Hover effects que ocultan contenido importante (info muere al alejar mouse).
- ❌ Splash/loader > 1s sin razón técnica.
- ❌ Cursor follower elaborado sin opt-out.
- ❌ Texto que aparece letra por letra > 1 línea.

## Reporte al cerrar

```markdown
## motion · <route/section> · YYYY-MM-DD
- Library: framer-motion (consistente en toda la página)
- LCP impact: +0ms (motion en componentes below-the-fold con whileInView)
- Reduced motion: respetado, fallback testeado en macOS y Windows
- 60fps verificado en Pixel 6 emulado, throttle 4× CPU
- Removed: parallax CSS de la versión v0 (causaba jank)
```

## Constraints / Do NOT

- NO mezclar GSAP + Framer Motion en el mismo componente.
- NO animar en mount global del documento — usar `whileInView`.
- NO hacer "wow demo" que tire LCP. Si la animación inicial bloquea el contenido hero, **eliminarla**.
- NO crear cursor followers sin checkbox de desactivación visible.
- NO usar `delay` largo para esconder código lento.
