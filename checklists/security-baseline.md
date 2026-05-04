# SECURITY BASELINE

> Lo mínimo en seguridad para un sitio USD 25K. Un solo ítem en rojo justifica frenar el deploy.

---

## Aplicación

- [ ] **TypeScript estricto** sin `any` en código de auth/billing/services críticos.
- [ ] **Validación zod** en todo input que entra al sistema (form, API, webhook).
- [ ] **CSRF tokens** en mutaciones (Better Auth lo trae; si rolling propio, implementarlo).
- [ ] **CORS estricto**: solo dominios propios; sin `*` salvo endpoints públicos justificados.
- [ ] **Rate limiting** en form de contacto, leads, login, signup (Upstash Ratelimit).
- [ ] **Bot protection** en forms críticos (honeypot + Cloudflare Turnstile).

## Cookies y sesiones

- [ ] Sesiones via cookies **httpOnly + secure + sameSite=lax**.
- [ ] **Cero JWT en localStorage**.
- [ ] **Cero tokens** en query params.
- [ ] Expiración razonable (Better Auth default 7d; ajustar a contexto).
- [ ] Logout invalida sesión server-side, no solo borra cookie.

## Auth

- [ ] Verificación de email obligatoria antes de signup completo.
- [ ] Password hashing argon2id o bcrypt cost 12+.
- [ ] Reset password con token de un solo uso, 30 min TTL.
- [ ] 2FA disponible (TOTP, magic link, passkey).
- [ ] Brute-force protection: lock o slowdown tras 5 intentos.
- [ ] Sin enumeración de usuarios (mismo mensaje "si existe la cuenta, te enviamos email").

## DB

- [ ] **RLS habilitada** en tablas multi-tenant.
- [ ] **Filtros de tenant** en cada query (defensa en profundidad).
- [ ] Permisos del DB user mínimos (no superuser desde la app).
- [ ] Backups automatizados con retención 30+ días.
- [ ] Test de restore real al menos una vez antes de go-live.
- [ ] Migrations versionadas; rollback plan documentado.
- [ ] Cero `select *` en endpoints que devuelven al cliente.

## Webhooks

- [ ] **Verificación de firma** criptográfica (Stripe, GHL, Resend).
- [ ] **Idempotency**: persistir event.id, skip si ya procesado.
- [ ] Endpoint con timeout corto; trabajo pesado a queue.
- [ ] Logs estructurados de cada webhook con `correlation_id`.
- [ ] Cuotas: monitorear volumen anormal.

## Pagos

- [ ] **Stripe en modo live** con keys correctas.
- [ ] **Customer portal** activo para gestión de subscription.
- [ ] **Webhooks** Stripe configurados y validados.
- [ ] **PCI**: no procesás tarjeta directamente; siempre Stripe Elements / Checkout.
- [ ] **Mercado Pago**: si aplica, modo prod, IPN configurado.
- [ ] **Pricing en una sola fuente** (`lib/stripe/plans.ts`); no duplicado en frontend.

## HTTPS y headers

- [ ] HTTPS forzado, HTTP 301 → HTTPS.
- [ ] **HSTS** con `max-age=31536000; includeSubDomains; preload`.
- [ ] **CSP** estricto, nonce-based, sin `unsafe-inline`.
- [ ] **X-Frame-Options DENY** (excepto si necesitás iframe legítimo).
- [ ] **X-Content-Type-Options nosniff**.
- [ ] **Referrer-Policy strict-origin-when-cross-origin**.
- [ ] **Permissions-Policy** restrictiva (cero camera/mic/geolocation salvo necesario).

## Secretos

- [ ] **Cero secrets en código**.
- [ ] **gitleaks** en pre-commit y CI.
- [ ] `.env.local` en `.gitignore`.
- [ ] `.env.example` con keys necesarias y valores vacíos.
- [ ] Secrets en Vercel/Netlify environment variables (no en `vercel.json`).
- [ ] Rotación: tras cualquier exposure, rotar inmediato y auditar uso.
- [ ] DB connection strings con SSL forzado.

## Dependencias

- [ ] `pnpm audit` sin críticos / highs.
- [ ] Lockfile committeado.
- [ ] Renovate o Dependabot configurado para updates de seguridad.
- [ ] Cero deps con < 1k stars/week downloads salvo justificación.

## Privacidad

- [ ] **Privacy policy** publicada y vigente.
- [ ] Política de retención de datos clara.
- [ ] Endpoints de **data export** y **data delete** si vendés en EU/CA (GDPR).
- [ ] Cookie banner si la jurisdicción lo exige; solo cookies estrictamente necesarias por default.
- [ ] PII mínima en logs (Sentry beforeBreadcrumb cleaning).
- [ ] Cero PII en URL params.
- [ ] Email logs con datos hasheados o truncados.

## Operación

- [ ] Sentry + alertas a Slack/Telegram.
- [ ] Uptime monitor (Better Stack, UptimeRobot, Cronitor).
- [ ] Logs aggregation con retention.
- [ ] Runbook básico en `OPERATIONS.md`.
- [ ] Roles del cliente con menor privilegio (no admin global salvo necesario).

## Para SaaS multi-tenant

- [ ] Test de cross-tenant access en CI (intentar leer datos de otro tenant → debe fallar).
- [ ] Audit log de acciones críticas (cambio plan, invite, delete).
- [ ] Soft-delete por default; hard-delete con confirmación + delay.
- [ ] Export de datos del tenant disponible (compliance).
- [ ] Delete account flow que limpia todo (compliance).

---

## Test de penetración rápido (manual, 30 min)

- [ ] Intentar SQL injection en cada input → falla con 400.
- [ ] Intentar XSS en cada input → escape correcto.
- [ ] Intentar CSRF (form simulado en otro dominio) → bloqueado.
- [ ] Intentar acceder a `/admin` sin auth → 403.
- [ ] Intentar leer datos de otro tenant cambiando un ID en URL → 403.
- [ ] Intentar abrir endpoint privado en modo incognito → 401.
- [ ] Verificar headers de seguridad con `securityheaders.com`.
- [ ] Verificar SSL con `ssllabs.com` → grado A o A+.

---

*La seguridad no es opcional para sitios que tocan dinero, datos personales o cuentas. Si no firmás esta checklist, no salís a producción.*
