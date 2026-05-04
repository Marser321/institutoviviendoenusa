# PLAN

> Plan de la fase activa, en XML para mejor parsing por el LLM.
> Generado y actualizado por la skill `rpiv-gate`. Cada fase tiene su propio bloque.
> Las decisiones de `CONTEXT.md` deben estar referenciadas explícitamente; sin esa referencia el plan se rechaza.

---

```xml
<plan phase="1" name="Auth + Onboarding" generated="2026-MM-DD" owner="<Mario>">
  <decisions_referenced>
    <ref id="D-01" reason="stack base" />
    <ref id="D-02" reason="Better Auth obligatorio" />
    <ref id="D-09" reason="cookies httpOnly" />
    <ref id="D-10" reason="RLS desde el inicio" />
  </decisions_referenced>

  <prerequisites>
    <item>UI-SPEC.md aprobado (D-06 motion).</item>
    <item>Schema users + organizations + memberships aplicado.</item>
    <item>Vars de Better Auth + Google OAuth en .env staging.</item>
  </prerequisites>

  <tasks>
    <task id="T-1" status="pending">
      <title>Configurar Better Auth con email+password y verificación</title>
      <files>
        <file>lib/auth.ts</file>
        <file>app/api/auth/[...all]/route.ts</file>
        <file>db/schema.ts</file>
      </files>
      <expected_lines>~120</expected_lines>
      <verification>
        Curl POST a /api/auth/sign-up retorna 200 + email recibido en cuenta de prueba.
      </verification>
    </task>

    <task id="T-2" status="pending">
      <title>Página /sign-up con form y validación zod</title>
      <files>
        <file>app/(auth)/sign-up/page.tsx</file>
        <file>components/auth/SignUpForm.tsx</file>
        <file>lib/validation/auth.ts</file>
      </files>
      <expected_lines>~160</expected_lines>
      <verification>
        Playwright E2E: rellenar form → recibir email → click verify → redirige a /dashboard.
      </verification>
    </task>

    <task id="T-3" status="pending">
      <title>Página /sign-in con OAuth Google</title>
      <files>
        <file>app/(auth)/sign-in/page.tsx</file>
        <file>components/auth/SignInForm.tsx</file>
      </files>
      <expected_lines>~140</expected_lines>
      <verification>
        Playwright E2E con cuenta Google de prueba: login → /dashboard.
      </verification>
    </task>

    <task id="T-4" status="pending">
      <title>Middleware de protección de rutas</title>
      <files>
        <file>middleware.ts</file>
      </files>
      <expected_lines>~40</expected_lines>
      <verification>
        Acceso a /dashboard sin sesión → redirige a /sign-in?redirect=/dashboard.
      </verification>
    </task>

    <task id="T-5" status="pending">
      <title>Stylistic + a11y + perf audit del flujo auth</title>
      <files>
        <file>app/(auth)/sign-up/page.tsx</file>
        <file>app/(auth)/sign-in/page.tsx</file>
        <file>components/auth/*</file>
      </files>
      <expected_lines>~80</expected_lines>
      <verification>
        - axe-core: 0 critical
        - Lighthouse A11y ≥ 95
        - Lighthouse Perf ≥ 90 mobile
      </verification>
    </task>
  </tasks>

  <out_of_scope>
    <item>2FA y passkeys → fase 1.5 si time, sino V2.</item>
    <item>Magic link → V2.</item>
  </out_of_scope>

  <risks>
    <risk>OAuth callback URL en producción requiere ajuste en Google Cloud Console al deploy.</risk>
    <risk>Resend free tier sandbox limita envíos diarios; configurar dominio antes de cerrar fase.</risk>
  </risks>
</plan>
```

---

## Plan archivado de fases anteriores

<!-- Cuando una fase cierra, mover el bloque acá con `<plan ... status="completed">` -->

---

*La fase activa siempre vive en el primer bloque. Si abrís una fase nueva sin cerrar la anterior, frená y revisá la disciplina.*
