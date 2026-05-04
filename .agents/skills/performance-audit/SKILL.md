---
name: performance-audit
description: Auditoría de rendimiento que valida Core Web Vitals (LCP, CLS, INP), tamaño de bundle, hidratación, optimización de imágenes y fuentes. Es la pasada 4 de vibe-design-pipeline. Bloqueante si Lighthouse Performance < 90 mobile o CLS > 0.05.
---

# Performance Audit

## Objetivo
Garantizar que la web cumple los budgets de performance que justifican USD 25K. La velocidad es percepción de calidad: una landing premium que tarda 4s en mostrar el LCP arruina toda la inversión visual.

## Budgets obligatorios (no negociables)

| Métrica                  | Budget mobile     | Budget desktop   |
|--------------------------|-------------------|------------------|
| **LCP** (Largest CP)     | ≤ 2.0s            | ≤ 1.2s           |
| **CLS** (Cumulative LS)  | ≤ 0.05            | ≤ 0.05           |
| **INP** (Interaction NP) | ≤ 200ms           | ≤ 100ms          |
| **TBT** (Total Block T)  | ≤ 200ms           | ≤ 150ms          |
| **FCP**                  | ≤ 1.5s            | ≤ 0.9s           |
| **TTFB**                 | ≤ 0.6s            | ≤ 0.3s           |
| **Lighthouse Perf**      | ≥ 90              | ≥ 95             |
| **Bundle JS inicial**    | ≤ 180kb gzip      | ≤ 220kb gzip     |
| **Bundle CSS inicial**   | ≤ 30kb gzip       | ≤ 30kb gzip      |

## Auditoría — checklist

### A · Imágenes
- [ ] `<img>` directo está prohibido; usar `next/image`, `astro:assets` o `<picture>` con `<source>`.
- [ ] Formatos modernos: AVIF prioritario, WebP fallback, JPG/PNG último recurso.
- [ ] Above-the-fold: `priority` + `fetchpriority="high"`.
- [ ] Below-the-fold: `loading="lazy"` y `decoding="async"`.
- [ ] `aspect-ratio` declarado siempre → 0 CLS.
- [ ] Sizes attribute correcto para `srcset`.

### B · Fonts
- [ ] Self-hosted (Fontsource o `next/font`).
- [ ] `font-display: swap` o `optional`.
- [ ] Preload solo de la principal del above-the-fold.
- [ ] Subset (latin, latin-ext) solo lo necesario.
- [ ] Variable fonts si la familia las soporta.

### C · JavaScript
- [ ] Bundle analyzer ejecutado (`@next/bundle-analyzer` o `rollup-plugin-visualizer`).
- [ ] Cualquier dep > 50kb gzip se cuestiona y justifica.
- [ ] Code-splitting por route automático (Next/Astro).
- [ ] Dynamic imports en componentes pesados below-the-fold (modal, chart, mapa).
- [ ] Tree-shaking verificado (lodash-es, no lodash; date-fns named imports).
- [ ] Million.js si es Next.js con re-renders pesados.
- [ ] `"use client"` solo donde necesario; el resto Server Components.

### D · CSS
- [ ] Tailwind CSS v4 con purga automática.
- [ ] Cero CSS-in-JS en render path (evitar styled-components SSR).
- [ ] Critical CSS extraído (Astro y Next lo hacen por defecto).

### E · Third-party scripts
- [ ] Analytics, chat widgets, GTM cargados con `<Script strategy="lazyOnload">` o Partytown.
- [ ] Sin scripts en `<head>` que bloqueen render.
- [ ] Iframes (YouTube, Vimeo) con `loading="lazy"` o lite-youtube-embed.

### F · Network
- [ ] HTTP/3 si el host lo soporta.
- [ ] Compresión Brotli activa (Vercel, Netlify lo hacen).
- [ ] Cache headers correctos en assets estáticos (`max-age=31536000, immutable`).
- [ ] Edge caching en HTML donde sea posible (ISR, SSG).

### G · Hidratación / re-renders
- [ ] React DevTools Profiler: ningún componente re-renderea > 5 veces por interacción.
- [ ] Memoización solo donde el profiler lo justifique (no `useMemo` defensivo en todo).
- [ ] Server Components donde no hay interactividad.
- [ ] Astro Islands para hidratación granular.

## Procedimiento de medición

### 1 · Lab (CI/local)
```bash
# Lighthouse
pnpm dlx lighthouse https://staging-url.com \
  --emulated-form-factor=mobile \
  --throttling-method=simulate \
  --only-categories=performance \
  --output=json --output-path=./perf.json

# Bundle analysis
ANALYZE=true pnpm build
```

### 2 · Field (RUM)
- PostHog Performance, Vercel Speed Insights, o Cloudflare Web Analytics.
- Validar que el budget se cumple para el p75 de usuarios reales, no solo para tu Mac.

### 3 · Reporte
Agregar a `STATE.md`:

```markdown
## perf · /<route> · YYYY-MM-DD
- LCP mobile: 1.7s ✅
- CLS: 0.02 ✅
- INP: 145ms ✅
- Bundle JS: 162kb gzip ✅
- Lighthouse Perf mobile: 92 ✅
- Findings:
  - imagen hero original 1.2MB → AVIF 85kb (-93%)
  - dynamic import de Chart, ahorró 80kb del bundle inicial
  - lighter font subset, ahorró 40kb
- Issues abiertas: ninguna
```

## Constraints / Do NOT

- NO firmar la pasada con métricas solo de desktop. Mobile es la verdad.
- NO usar throttling "Fast 3G" como excusa; medir en "Slow 4G" o más estricto si target es LATAM.
- NO confiar solo en Lighthouse; cruzar con PageSpeed Insights real-world data.
- NO importar la totalidad de una librería UI si solo usás 2 componentes.
- NO permitir `<iframe>` de YouTube/Vimeo sin lazy-load — único peor offender de LCP.
- NO dejar `console.log` en production builds.
