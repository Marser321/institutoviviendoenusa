---
name: saas-auth-stack
description: Construye el stack de SaaS con auth (Better Auth o Clerk), DB Postgres con Drizzle, billing Stripe con webhooks idempotentes, multi-tenancy si aplica, RBAC, audit log, y RLS. Activar tras router cuando project_type = C.
---

# SaaS + Auth Stack

## Objetivo
Producir el backbone completo de un SaaS productizable: auth segura, datos aislados por tenant, billing automatizable, audit trail, y un dashboard que escale.

## Stack canónico

```
Next.js 15 (App Router)
  + Tailwind v4 + shadcn + Tremor (charts)
  + Better Auth (default) o Clerk (hosted)
  + Drizzle ORM + Postgres (Neon o Supabase)
  + Stripe (subscriptions + customer portal)
  + Resend + React Email (transaccional)
  + TanStack Query v5
  + zod
  + Sentry + PostHog
  + Vercel
```

## Esqueleto de carpetas

```
src/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/page.tsx
│   │   ├── sign-up/page.tsx
│   │   ├── verify/page.tsx
│   │   └── forgot/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx (sidebar, topbar)
│   │   ├── dashboard/page.tsx
│   │   ├── settings/
│   │   ├── billing/
│   │   └── team/
│   ├── api/
│   │   ├── auth/[...all]/route.ts
│   │   ├── webhooks/stripe/route.ts
│   │   └── trpc/ (opcional)
│   └── layout.tsx
├── lib/
│   ├── auth.ts            # Better Auth config
│   ├── db/
│   │   ├── schema.ts
│   │   ├── client.ts
│   │   └── migrations/
│   ├── stripe/
│   │   ├── client.ts
│   │   ├── plans.ts
│   │   └── webhooks.ts
│   ├── email/
│   │   ├── client.ts
│   │   └── templates/
│   └── services/
│       ├── users.ts
│       ├── teams.ts
│       └── billing.ts
├── components/
├── hooks/
├── stores/
└── middleware.ts
```

## Better Auth — configuración mínima

```ts
// lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db/client";
import { organization, twoFactor, magicLink, passkey } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: { enabled: true, requireEmailVerification: true },
  socialProviders: {
    google: { clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! },
  },
  plugins: [
    organization({ allowUserToCreateOrganization: true }),
    twoFactor(),
    magicLink({ sendMagicLink: async ({ email, url }) => sendEmail("magic-link", email, { url }) }),
    passkey(),
  ],
  session: { cookieCache: { enabled: true, maxAge: 5 * 60 } },
  advanced: { useSecureCookies: true, cookiePrefix: "<app>" },
});
```

## Drizzle — schema mínimo

```ts
// lib/db/schema.ts
import { pgTable, text, timestamp, uuid, varchar, boolean, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  emailVerified: boolean("email_verified").default(false),
  name: varchar("name", { length: 200 }),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  ownerId: uuid("owner_id").references(() => users.id),
  stripeCustomerId: varchar("stripe_customer_id", { length: 80 }),
  plan: varchar("plan", { length: 40 }).default("free").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const memberships = pgTable("memberships", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
  role: varchar("role", { length: 40 }).$type<"owner" | "admin" | "member">().default("member"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

Multi-tenancy: cada query toca solo registros de la organización activa (filtro obligatorio en todos los services).

## Middleware de protección

```ts
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(req: NextRequest) {
  const protected_paths = ["/dashboard", "/settings", "/billing", "/team"];
  const isProtected = protected_paths.some((p) => req.nextUrl.pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();
  const session = getSessionCookie(req);
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*", "/settings/:path*", "/billing/:path*", "/team/:path*"] };
```

## Stripe — webhooks idempotentes

```ts
// app/api/webhooks/stripe/route.ts
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe/client";
import { handleStripeEvent } from "@/lib/stripe/webhooks";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (e) {
    return new Response("invalid signature", { status: 400 });
  }
  // Idempotency: persist event.id; skip if seen
  const seen = await markProcessedIfNew(event.id);
  if (!seen) return new Response(null, { status: 200 });
  await handleStripeEvent(event);
  return new Response(null, { status: 200 });
}
```

## RLS (Row Level Security) — Postgres

Para Supabase / Postgres, declarar políticas:

```sql
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY org_isolation ON projects USING (organization_id = current_setting('app.org_id')::uuid);
```

Y en cada request setear `SET LOCAL app.org_id = '<uuid>'`. Esto asegura que aún si la app falla en filtrar, la DB no entrega datos de otro tenant.

## Email transaccional

```tsx
// emails/welcome.tsx
import { Html, Body, Container, Heading, Button, Text } from "@react-email/components";
export default function WelcomeEmail({ name, magicLink }: { name: string; magicLink: string }) {
  return (
    <Html>
      <Body>
        <Container>
          <Heading>Bienvenido, {name}</Heading>
          <Text>Estás a un click de empezar.</Text>
          <Button href={magicLink}>Activar cuenta</Button>
        </Container>
      </Body>
    </Html>
  );
}
```

## Audit trail (recomendado)

Tabla `audit_log` con `user_id, organization_id, action, target_type, target_id, metadata, ip, user_agent, created_at`. Insertar desde services en cada operación crítica (cambio de plan, invite, eliminación).

## Pipeline recomendada

1. `ui-spec-author` → spec dashboard.
2. `frontend-foundation` por rebanada vertical:
   - S-1: signup + email verify (Better Auth out of the box).
   - S-2: dashboard vacío + sidebar.
   - S-3: organizations + invite.
   - S-4: pricing + checkout Stripe.
   - S-5: webhook handler + plan sync.
   - S-6: billing portal + subscription cancellation.
   - S-7: 2FA / passkeys.
3. Cada slice pasa por: stylistic → a11y → performance.
4. Sentry instalado desde S-1.
5. PostHog tracking eventos clave (`signup`, `subscribe`, `cancel`).

## Constraints / Do NOT

- NO almacenar passwords nunca; Better Auth/Clerk se encargan.
- NO permitir queries sin filtro de organization_id en services multi-tenant.
- NO hardcodear price_ids de Stripe; centralizarlos en `lib/stripe/plans.ts`.
- NO hacer side effects en webhook handlers sin idempotency check.
- NO exponer tokens de API en client bundles (verificar con bundle analyzer).
- NO permitir redirect a URLs externas en `redirect` query param sin validar.
- NO olvidar GDPR / data export / data delete endpoints si vendés en EU.
