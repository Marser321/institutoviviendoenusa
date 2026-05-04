---
name: corporate-site
description: Construye sitios corporativos e institucionales multi-página visualmente impactantes con CMS headless, blog, multi-idioma, SEO técnico, y arquitectura de contenido escalable. Consume CURATED-BRIEF.md para el estilo visual (Editorial Dramatic / Glassmorphic Luxury / Organic Warm dominan en este tipo) y orquesta magic-section-designer para cada bloque del CMS. Stack default Astro 5 + Tailwind v4 + Sanity v3 (o Payload). Activar tras router cuando project_type = B. NO defaultear a minimal-refined salvo industria conservadora explícita.
---

# Corporate / Institutional Site

## Objetivo
Producir un sitio corporativo donde el contenido vive en un CMS headless, el equipo del cliente puede editar sin tocar código, el SEO técnico es impecable, la arquitectura escala a múltiples idiomas — y el sitio NO se ve corporativo aburrido. La diferencia entre un sitio corporativo USD 25K y uno USD 5K es exactamente la coherencia visual de carácter en cada bloque.

## Pre-requisitos
- `docs/CURATED-BRIEF.md` con estilo del catálogo y blueprint de secciones por página.
- `docs/UI-SPEC.md` con tokens.
- Si el cliente exige minimal-refined, justificación tildada en la matriz `business-style-matrix.md` (industria conservadora, audiencia enterprise, etc.).

## Stack canónico

```
Astro 5 (Server Islands)
  + Tailwind v4 (@theme)
  + shadcn primitives (Sheet, Dropdown, Tabs)
  + Sanity v3 o Payload CMS 3
  + Velite (MDX docs)
  + paraglide o next-intl (i18n)
  + Fontsource (self-hosted)
  + sharp (asset pipeline)
  + Resend (form contacto)
  + PostHog o Plausible
  + Vercel/Netlify
```

## Arquitectura de contenido (CMS)

### Sanity v3 — schema mínimo

```ts
// sanity/schemas/page.ts
defineType({
  name: "page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: r => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "language", type: "string", options: { list: ["es", "en", "pt"] } }),
    defineField({ name: "seo", type: "seoMeta" }),
    defineField({ name: "blocks", type: "array", of: [
      { type: "heroBlock" },
      { type: "richTextBlock" },
      { type: "ctaBlock" },
      { type: "logosBlock" },
      { type: "teamBlock" },
      { type: "faqBlock" },
    ]}),
  ],
});
```

Patrón **block-based**: la página es una array de bloques tipados. El editor compone como Lego, sin tocar código. El front renderea cada bloque con un componente correspondiente.

### Payload CMS 3 (alternativa self-hostable)
Mismo patrón. Ventaja: Next.js native, admin auto-generado, migrations en código.

## Anatomía típica del sitio

```
/                       Home
/nosotros               About / Equipo
/servicios              Servicios overview
/servicios/[slug]       Servicio individual
/casos-de-exito         Portfolio / cases
/casos-de-exito/[slug]
/blog                   Blog index
/blog/[slug]            Post
/contacto               Form de contacto
/legal/privacidad       Privacy
/legal/terminos         Terms
/es | /en | /pt         i18n routing
```

## SEO técnico — checklist

- [ ] `<title>` único y < 60 chars por página.
- [ ] `<meta name="description">` < 160 chars.
- [ ] OpenGraph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`).
- [ ] Twitter Cards.
- [ ] `<link rel="canonical">` correcto.
- [ ] Schema.org JSON-LD (Organization, BreadcrumbList, Article, LocalBusiness).
- [ ] `sitemap.xml` generado automáticamente.
- [ ] `robots.txt` correcto.
- [ ] hreflang entre versiones de idioma.
- [ ] URLs limpias, en español/inglés según target.
- [ ] No `index.html` en URL final.
- [ ] 301 redirects de URLs viejas si es migración.
- [ ] Sin contenido duplicado entre idiomas.
- [ ] Imágenes con `alt` descriptivo.
- [ ] Heading hierarchy correcta.
- [ ] Tiempo de carga < 2s mobile.

## i18n con paraglide (recomendado en 2026)

```ts
// i18n.config.ts
import { paraglide } from "@inlang/paraglide-astro";
export default {
  sourceLanguageTag: "es",
  languageTags: ["es", "en", "pt"],
};
```

Ventaja: tree-shaking por idioma, type-safety en mensajes, build-time only.

## Blog

- Posts en CMS o MDX (Velite si va por archivos).
- RSS feed automático.
- Reading time, share links, table of contents.
- Related posts por taxonomía.
- Comments via Disqus, Giscus, o nativo si hay backend.

## Performance específica corporativa

- ISR / SSG para todas las páginas de contenido.
- `astro:assets` para imágenes con `quality={80}`, formato AVIF.
- Fonts subsetting agresivo (latin + extras según idioma).
- Sin scripts de terceros en `<head>` (Partytown si GTM es obligatorio).

## Pipeline recomendada

1. `ui-spec-author` (incluyendo guidelines editoriales).
2. Configurar Sanity/Payload con schemas de bloques aprobados.
3. Seed de contenido (al menos 1 página por tipo y 3 posts).
4. `frontend-foundation` por bloque (rebanadas verticales por block schema).
5. Pasadas: stylistic → a11y → performance.
6. SEO técnico verificado con Lighthouse SEO + Ahrefs/Screaming Frog.
7. i18n testeado en todos los idiomas declarados.
8. Form de contacto con Resend, double opt-in si aplica.

## Constraints / Do NOT

- NO mezclar CMS + archivos estáticos para mismo tipo de contenido.
- NO permitir que el editor del cliente modifique el HTML — debe trabajar siempre en bloques tipados.
- NO usar 5 idiomas si el cliente solo hablará 2 (mantenimiento se duplica).
- NO escapar del schema CMS con "rich text libre" — termina en sopa visual.
- NO indexar páginas de staging (`X-Robots-Tag: noindex`).
- NO olvidar páginas legales (privacy, terms, cookies).
