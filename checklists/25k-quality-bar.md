# 25K QUALITY BAR

> Auditoría final de "¿esto cobra USD 25K?". Si no tildás ≥ 90% de los ítems, el sitio no llega ahí — bajá el precio o subí la calidad.

---

## Visual y branding

- [ ] El sitio es **inmediatamente reconocible** como del cliente (logo, paleta, tipografía coherentes).
- [ ] Cero "look genérico de IA" (gradients morados aleatorios, hero predecible).
- [ ] Las imágenes son **propias** (no stock obvio).
- [ ] Las ilustraciones (si las hay) están en un estilo único.
- [ ] El logo se ve nítido en mobile y desktop.
- [ ] Cada estado (loading, empty, error, success) tiene tratamiento visual cuidado.

## Copywriting

- [ ] Cada H1 vende, no describe.
- [ ] El subtítulo de cada hero responde "para quién, qué, cómo".
- [ ] Los CTAs tienen verbo + beneficio (no "Click here").
- [ ] Los errores son humanos ("No encontramos esa página", no "Error 404").
- [ ] Los empty states tienen humor o alma (no "No items").
- [ ] El microcopy de los formularios reduce ansiedad.
- [ ] El idioma es consistente (vos vs tú; formal vs informal).
- [ ] Cero typos.
- [ ] El blog (si hay) tiene 3+ posts seed bien escritos.

## Detalles de motion

- [ ] Smooth scroll global con Lenis (si landing).
- [ ] Reveal on scroll con stagger (no aparición brusca).
- [ ] Hover states sutiles pero presentes (scale 1.02, opacity 0.9).
- [ ] Transiciones de página suaves (si aplica).
- [ ] Skeleton loading consistente.
- [ ] Toasts elegantes (sonner) con duración correcta.
- [ ] prefers-reduced-motion respetado.
- [ ] 60fps en mid-range mobile.

## UX

- [ ] Mobile responsive desde 320px hasta 1920px sin breakpoints feos.
- [ ] Tablet (768-1024) tiene tratamiento dedicado, no es "mobile estirado".
- [ ] Forms con autofill correcto (autocomplete attributes).
- [ ] Formato de números, fechas, monedas localizado (es-UY si aplica).
- [ ] Modal/dialog con focus trap + esc + click outside.
- [ ] Drawer mobile bien implementado (vaul).
- [ ] Tablas con sort, filter, paginación cuando hay > 10 filas.
- [ ] Scroll position recordado al volver atrás.

## Performance

- [ ] Lighthouse Perf mobile ≥ 90 (idealmente 95+).
- [ ] Lighthouse Perf desktop ≥ 95.
- [ ] LCP ≤ 1.5s mobile en route principal.
- [ ] CLS ≤ 0.05.
- [ ] INP ≤ 200ms en interacciones críticas.
- [ ] Bundle JS inicial ≤ 180kb gzip.
- [ ] Imágenes AVIF/WebP optimizadas.
- [ ] Cero scripts third-party bloqueando render.

## Accesibilidad

- [ ] Lighthouse A11y ≥ 95.
- [ ] axe-core 0 critical/serious.
- [ ] Keyboard nav completa en flows críticos.
- [ ] Screen reader probado al menos en home + 1 flow.
- [ ] Contraste WCAG AA en light + dark.
- [ ] Focus visible siempre.
- [ ] Forms con labels asociados, errores aria-describedby.
- [ ] Imágenes con alt descriptivo.

## SEO técnico

- [ ] Cada página con `<title>` y `description` únicos.
- [ ] OpenGraph + Twitter cards.
- [ ] JSON-LD según contenido (Organization, BreadcrumbList, Article, Product, etc.).
- [ ] sitemap.xml dinámico.
- [ ] robots.txt correcto.
- [ ] hreflang si i18n.
- [ ] Core Web Vitals en verde.

## Integraciones vivas

- [ ] CMS (si aplica) editable por el cliente sin tocar código.
- [ ] Forms de contacto con email entregable.
- [ ] CRM (GHL/HubSpot) con leads llegando con tags correctos.
- [ ] Pagos (Stripe/MP) con tarjeta de prueba completando flow.
- [ ] Email transaccional con marca propia (DKIM, SPF, DMARC).
- [ ] Analytics tracking eventos de funnel.

## Seguridad

- [ ] HTTPS forzado.
- [ ] CSP estricto, sin `unsafe-inline`.
- [ ] HSTS activo.
- [ ] Cero secrets en código.
- [ ] Cookies httpOnly + secure + sameSite.
- [ ] Rate limiting en endpoints públicos.
- [ ] CSRF tokens en mutaciones.
- [ ] RLS en DB multi-tenant.
- [ ] gitleaks limpio.
- [ ] `pnpm audit` sin críticos.

## Observabilidad

- [ ] Sentry capturando errores con contexto.
- [ ] PostHog tracking sin gaps en funnel.
- [ ] RUM (Speed Insights / Web Vitals) activo.
- [ ] Alertas configuradas a canal directo del responsable.
- [ ] Health endpoint funcionando.

## Documentación de handoff

- [ ] OPERATIONS.md con steps para deploy, content edit, troubleshoot.
- [ ] README.md con setup local desde cero.
- [ ] Loom de capacitación para el cliente (10-20 min).
- [ ] Acceso compartido a herramientas (Sentry, PostHog, Vercel, GHL, Stripe).
- [ ] Diccionario de tags / pipelines / custom fields del CRM.

---

## Veredicto

| % tildado | Acción                                                                          |
|-----------|----------------------------------------------------------------------------------|
| 95-100%   | ✅ Es un sitio USD 25K. Cobralo con orgullo.                                     |
| 85-94%    | ⚠️ Falta poco. Identificar los 3-5 ítems faltantes y cerrarlos en 1-2 días.    |
| 70-84%    | 🟠 No llega. Renegociar scope V1.1 con cliente o bajar precio a USD 15-18K.     |
| <70%      | 🔴 No es un proyecto USD 25K. No lo entregues como tal; rehacer fases faltantes.|

---

*Este es el espejo. Si no te gusta lo que ves, todavía estás a tiempo de pulirlo.*
