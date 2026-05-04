---
name: vertical-slicer
description: Fragmenta features grandes en rebanadas verticales atómicas (schema → controlador → routing → UI → hooks) de máximo 200 líneas cada una, en lugar de implementarlas horizontalmente. Activar antes de cualquier feature que toque más de una capa del stack o que el usuario pidió "completa de una".
---

# Vertical Slicer

## Objetivo
Forzar al agente a entregar features completas pero cortas. Una rebanada vertical es funcional end-to-end, no rompe lo previo, y se puede revertir con un solo `git revert`. Esto evita los megacommits que el LLM tiende a producir y que después son irreversibles.

## Principio fundamental
**Horizontal slicing (malo)**: "primero hago todos los schemas, luego todos los controllers, luego toda la UI". Genera 600 líneas sin nada funcional.

**Vertical slicing (bueno)**: "rebanada 1: usuario puede ver SU LISTA de proyectos vacía. Schema mínimo + endpoint + page + hook. Funcional end-to-end aunque sea aburrido".

## Instrucciones operativas

1. **Recibí una feature** del usuario o del `ROADMAP.md`.
2. **Descomponé** la feature en rebanadas verticales que cumplan TODAS estas condiciones:
   - Cada rebanada toca de schema a UI.
   - Cada rebanada deja la app **deployable y verde** al cerrarse.
   - Cada rebanada ≤ 200 líneas brutas de delta.
   - Cada rebanada tiene un *demo gif/curl/screenshot* posible al cerrarse.
3. **Producí una tabla** de rebanadas con esta forma:

```yaml
feature: "<nombre del feature>"
slices:
  - id: S-1
    title: "Usuario autenticado ve su lista de proyectos vacía"
    layers:
      schema:    "tabla projects (id uuid, owner uuid, name text, created_at)"
      backend:   "GET /api/projects → array vacío para el usuario actual"
      routing:   "ruta /dashboard/projects"
      ui:        "ProjectsEmptyState con CTA Crear nuevo (sin handler aún)"
      hooks:     "useProjects() con TanStack Query"
    expected_lines: 140
    deploy_safe: true
    demo: "screenshot del empty state"
  - id: S-2
    title: "Usuario crea proyecto y aparece en la lista"
    ...
```

4. **Confirmá con el usuario** la cantidad y orden de rebanadas antes de implementar.
5. **Implementá una rebanada por sesión**. Al cerrarse:
   - Commit atómico: `feat(projects): S-1 empty list view`.
   - Update de `STATE.md` con el demo y la fecha.
   - Documentar la slice en una carpeta `/docs/slices/S-1.md` con: descripción, archivos tocados, decisiones tomadas.

## Capas verticales por tipo de proyecto

### Para SaaS
```
1. db/schema.ts (Drizzle)
2. db/migrations/000X_name.sql
3. lib/services/<feature>.ts  (lógica de negocio pura)
4. app/api/<feature>/route.ts (HTTP handler)
5. app/<route>/page.tsx        (server component)
6. components/<feature>/...    (UI)
7. hooks/use<Feature>.ts       (TanStack Query wrapper)
```

### Para Astro / corporativo
```
1. src/content/config.ts       (schema de contenido)
2. src/content/<colección>/*   (docs / posts seed)
3. src/pages/<ruta>.astro      (página)
4. src/components/<feature>/*  (componentes)
5. src/styles/                 (tokens)
```

### Para landing premium
```
1. tokens en tailwind.config / @theme
2. componente de sección (Hero, Pricing, etc.)
3. integración de motion (Framer Motion)
4. assets optimizados (sharp/astro:assets)
5. CTA wired a Resend/GHL
```

## Constraints / Do NOT

- NO entregar una rebanada que rompa el build.
- NO mezclar dos rebanadas en un solo PR.
- NO hacer "refactor + feature" en una rebanada — el refactor es su propio slice.
- NO saltarse capas (e.g., "después le pongo el hook"). Si no entra en 200 líneas, refragmentá.
- NO dejar TODOs `// implement later` en código de slice cerrada.

## Few-Shot Example

**Feature pedida**: "Sistema de comentarios en blog post"

**Output incorrecto (horizontal)**:
> S-1: schemas de comments, replies y likes
> S-2: APIs CRUD completas
> S-3: toda la UI

**Output correcto (vertical)**:
```yaml
slices:
  - id: S-1
    title: "Visitante ve un cero comments en un post (read-only)"
    expected_lines: 120
    layers: { schema: "comments(id, post_id, body, author_name, created_at)", backend: "GET /api/posts/[id]/comments", ui: "CommentsList vacía con 'Sé el primero en comentar'", hooks: "useComments(postId)" }
  - id: S-2
    title: "Visitante anónimo deja comment con nombre+texto"
    expected_lines: 160
    layers: { backend: "POST /api/posts/[id]/comments con zod", ui: "CommentForm + react-hook-form", hooks: "useCreateComment con optimistic update" }
  - id: S-3
    title: "Sistema anti-spam: rate limit + honeypot"
    expected_lines: 90
  - id: S-4
    title: "Reply a comment (un nivel)"
    expected_lines: 180
```
