# PRE-DEPLOY CHECKLIST

> Antes de cada deploy a producción. Sin esto, garantizás bugs en vivo.

---

## Build y código

- [ ] `pnpm build` corre verde sin warnings nuevos.
- [ ] `pnpm typecheck` sin errores.
- [ ] `pnpm lint` sin errores.
- [ ] `pnpm format:check` limpio.
- [ ] Tests E2E críticos en verde (Playwright).
- [ ] Tests unitarios en verde (Vitest).
- [ ] Bundle analyzer revisado: ningún chunk inicial > budget.
- [ ] Cero `console.log` en código de producción.
- [ ] Cero `// TODO: implement` en código de slices cerradas.
- [ ] Cero `any` o `@ts-ignore` nuevos.

## Infraestructura

- [ ] Variables de entorno en producción configuradas y verificadas.
- [ ] Secrets rotados desde el último deploy si hubo exposure.
- [ ] DB migrations corridas en staging exitosamente.
- [ ] Backup de DB tomado antes del deploy (si es production con datos reales).
- [ ] DNS apuntando correctamente con TTL razonable.
- [ ] HTTPS forzado, redirect 301 de http a https.
- [ ] WWW vs apex resuelto consistentemente.
- [ ] Cache headers correctos en CDN.

## Seguridad

- [ ] CSP estricto activo (nonce-based, sin `unsafe-inline`).
- [ ] HSTS activo con `preload` si dominio listo.
- [ ] X-Frame-Options DENY o SAMEORIGIN.
- [ ] X-Content-Type-Options nosniff.
- [ ] Referrer-Policy strict-origin-when-cross-origin.
- [ ] CSRF tokens en formularios mutativos.
- [ ] Rate limiting en endpoints públicos.
- [ ] gitleaks última pasada limpia.
- [ ] Dependencias auditadas (`pnpm audit` sin highs/critical).
- [ ] No hay endpoints `/admin` accesibles sin auth.

## Performance

- [ ] Lighthouse Perf mobile ≥ 90 en routes públicas.
- [ ] Lighthouse Perf desktop ≥ 95.
- [ ] LCP p75 ≤ 2s mobile.
- [ ] CLS ≤ 0.05.
- [ ] INP ≤ 200ms.
- [ ] Bundle JS inicial ≤ 180kb gzip.
- [ ] Imágenes optimizadas (AVIF/WebP).
- [ ] Fonts subset + preload de la principal.

## Accesibilidad

- [ ] Lighthouse A11y ≥ 95 en todas las routes públicas.
- [ ] axe-core CLI: 0 critical / 0 serious.
- [ ] Manual keyboard nav OK en flows críticos (signup, checkout, contact).
- [ ] Screen reader OK (NVDA o VoiceOver) en home + 1 flow crítico.
- [ ] prefers-reduced-motion respetado.
- [ ] Contraste WCAG AA validado en light + dark.

## SEO

- [ ] `<title>` único y < 60 chars en cada página.
- [ ] Meta description < 160 chars en cada página.
- [ ] OpenGraph + Twitter Cards en cada página pública.
- [ ] JSON-LD según tipo de contenido.
- [ ] sitemap.xml accesible y correcto.
- [ ] robots.txt correcto (allow prod, noindex staging).
- [ ] Canonical URLs correctas.
- [ ] hreflang si i18n.
- [ ] 301 redirects desde URLs viejas si es migración.

## Observabilidad

- [ ] Sentry recibiendo eventos (probado disparando un error de prueba).
- [ ] PostHog tracking eventos clave de funnel.
- [ ] Vercel Speed Insights / Cloudflare Web Analytics activo.
- [ ] Health endpoint `/api/health` responde 200 con body útil.
- [ ] Alertas configuradas (Sentry → Slack/Telegram, uptime monitor → email).
- [ ] Logs estructurados (no `console.log` en producción).

## Pagos (si aplica)

- [ ] Stripe en modo live, keys correctas.
- [ ] Webhooks configurados en endpoints públicos.
- [ ] Idempotency probada con doble webhook.
- [ ] Customer portal accesible.
- [ ] Test card prohibido en live.
- [ ] Si LATAM: Mercado Pago en modo prod, credenciales correctas.

## Email transaccional (si aplica)

- [ ] Dominio verificado en Resend (DKIM, SPF, DMARC).
- [ ] Templates renderean correctos en Gmail, Outlook, iOS Mail.
- [ ] Cero links absolutos a localhost.
- [ ] Unsubscribe link en marketing emails.

## CRM (si aplica)

- [ ] GHL conectado a sub-account de producción (no staging).
- [ ] Pipelines, stages, custom fields IDs validados.
- [ ] Webhooks inbound funcionando (probado con canary).
- [ ] Workflows activos.
- [ ] Tags conventions documentadas en `OPERATIONS.md`.

## Legal

- [ ] Privacy policy publicada y linkeada en footer.
- [ ] Terms of service publicados y linkeados.
- [ ] Cookie banner si aplica (GDPR).
- [ ] Política de cookies coherente con tracking real.
- [ ] Datos de contacto del responsable legal visibles si normativa lo exige.

## Documentación

- [ ] STATE.md con resumen final de la fase de hardening.
- [ ] OPERATIONS.md para handoff (deploy, content edit, troubleshooting).
- [ ] README.md con setup local funcional desde cero.
- [ ] Acceso compartido a Sentry, PostHog, Vercel con el cliente.

---

## Stop condition

Si cualquier ítem `MUST` falla, **NO desplegar**. Documentar como `<issue>` en `STATE.md`, escalar al stakeholder, y posponer hasta resolver.

---

*El último deploy es el más peligroso. La adrenalina hace saltarse pasos. La checklist no.*
