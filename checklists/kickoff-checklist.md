# KICKOFF CHECKLIST

> Ítems a tildar antes de la primera línea de código. Sin esto, el proyecto arranca cojo.

---

## Cliente y contrato

- [ ] Contrato firmado con scope V1 + entregables explícitos.
- [ ] 50% de honorarios cobrado.
- [ ] Acceso a stakeholder único de decisión por parte del cliente (un nombre, no un comité).
- [ ] Canal de comunicación acordado (WhatsApp, Slack, email).
- [ ] Frecuencia de demos pactada (semanal recomendada).

## Discovery

- [ ] Sesión de discovery realizada (60-90 min).
- [ ] Brief escrito y firmado por cliente.
- [ ] Manual de marca o referencias visuales recibidas.
- [ ] Lista de integraciones existentes y futuras.
- [ ] Compliance requirements identificados (GDPR, HIPAA, etc.).

## Documentación inicial

- [ ] `PROJECT.md` completo.
- [ ] `REQUIREMENTS.md` con REQ-001..N, estados MUST/SHOULD/COULD/WONT.
- [ ] `ROADMAP.md` con fases y exit criteria.
- [ ] `CONTEXT.md` con D-01..D-05 mínimo (stack, hosting, DB, auth, idioma).
- [ ] Cliente firmó (digital o por escrito) los REQS V1.

## Diseño

- [ ] `UI-SPEC.md` aprobado.
- [ ] Wireframes navegables (Stitch / v0) aprobados por cliente.
- [ ] Tokens exportados (paleta oklch, escala tipo, spacing).
- [ ] Tipografías licenciadas correctamente.
- [ ] Pares de contraste validados WCAG AA.

## Repositorio

- [ ] Repo creado en GitHub/GitLab con visibility correcta.
- [ ] `AGENTS.md` y/o `CLAUDE.md` en raíz.
- [ ] `.cursor/rules/` poblado con reglas condicionales.
- [ ] Estructura `src/` según template del stack elegido.
- [ ] `docs/` con templates GSD listos para llenar.
- [ ] `.gitignore` correcto (node_modules, .env, .next, dist, .vercel).
- [ ] `.env.example` con keys necesarias y valores vacíos.
- [ ] Pre-commit hooks (`lefthook` o `husky`): typecheck + lint + format.
- [ ] `gitleaks` en pre-commit para detectar secrets.

## CI/CD

- [ ] PR check: typecheck + lint + tests + build.
- [ ] Preview deploy automático al hacer PR (Vercel/Netlify).
- [ ] Lighthouse CI configurado con budgets.
- [ ] axe-core en CI.
- [ ] Drizzle migrate check en CI.

## Servicios externos

- [ ] Vercel/Netlify project creado, environment vars cargadas.
- [ ] Sentry project creado, DSN cargado.
- [ ] PostHog project creado, key cargada.
- [ ] DB provider (Neon/Supabase) creado, connection string en env.
- [ ] Stripe account en test mode, keys cargadas.
- [ ] Resend domain verificado, key cargada.
- [ ] Si aplica: GHL sub-account configurada, PIT token cargado.
- [ ] Si aplica: Twilio + WhatsApp Cloud configurado.
- [ ] Si aplica: Mercado Pago credentials cargadas.

## Skills y arsenal

- [ ] Workspace skills cargadas (`.agents/skills/...`).
- [ ] `00-router` ejecutado con OK del usuario.
- [ ] `context-hygiene` activa.
- [ ] Stack template clonado a `src/`.

---

*Tildá los 100% antes de la Fase 1. Cada ítem skipeado vuelve como tarea bloqueante después.*
