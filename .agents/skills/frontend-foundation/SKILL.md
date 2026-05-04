---
name: frontend-foundation
description: Genera la topología estructural inicial de un componente, página o sección (DOM semántico, estado UI con Zustand, hooks de data con TanStack Query) sin estilos finales ni motion. Es la pasada 1 de vibe-design-pipeline. Activar cuando exista UI-SPEC y se inicie un componente nuevo.
---

# Frontend Foundation

## Objetivo
Generar el esqueleto estructural correcto antes de pintar nada. Si la fundación está mal (HTML no semántico, estado mal organizado, fetching dentro de componentes leaf), todo lo que se construya encima va a tener fugas de calidad imposibles de tapar con CSS.

## Output exclusivo de esta pasada
- HTML semántico correcto.
- Componentes con tokens del UI-SPEC pero sin pulido visual.
- Estado UI global → Zustand (NO useState anidados).
- Data fetching → TanStack Query / Server Components.
- Validación de boundaries → zod.
- Cero estilos inline. Cero magic numbers. Cero `any`.

## Instrucciones operativas

### A · Decisiones de arquitectura del componente

1. **Server vs Client**: por defecto Server Component (Next.js) o `.astro` static. Solo `"use client"` si necesita interacción/estado.
2. **Estado UI**:
   - Local trivial → `useState`.
   - Compartido entre 2+ componentes hermanos → Zustand store dedicado.
   - URL state (filtros, paginación) → `nuqs`.
3. **Data**:
   - SSR/RSC → fetch en server component, pasar como prop.
   - Client → TanStack Query con queryKey explícita.
   - Mutaciones → Server Actions o `useMutation`.
4. **Validación**:
   - Cualquier input → `zod schema → react-hook-form → server validation` (triple gate).
5. **Subcomponentes**:
   - Si excede ~120 líneas, descomponer en archivos hermanos antes de cerrar la pasada.

### B · Esqueleto del componente (template)

```tsx
// app/dashboard/projects/page.tsx
import { ProjectsList } from "@/components/projects/list";
import { listProjectsForUser } from "@/lib/services/projects";
import { auth } from "@/lib/auth";

export default async function ProjectsPage() {
  const session = await auth();
  if (!session?.user) return null; // middleware ya redirige
  const projects = await listProjectsForUser(session.user.id);
  return (
    <main aria-labelledby="projects-heading" className="container py-12">
      <header className="flex items-center justify-between">
        <h1 id="projects-heading" className="text-3xl font-display">
          Tus proyectos
        </h1>
        <NewProjectButton />
      </header>
      <ProjectsList projects={projects} />
    </main>
  );
}
```

### C · Estado UI con Zustand (cuando aplica)

```ts
// stores/use-projects-ui.ts
import { create } from "zustand";

type ProjectsUI = {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedIds: Set<string>;
  toggleSelected: (id: string) => void;
  clearSelection: () => void;
};

export const useProjectsUI = create<ProjectsUI>((set) => ({
  searchQuery: "",
  setSearchQuery: (q) => set({ searchQuery: q }),
  selectedIds: new Set(),
  toggleSelected: (id) =>
    set((s) => {
      const next = new Set(s.selectedIds);
      next.has(id) ? next.delete(id) : next.add(id);
      return { selectedIds: next };
    }),
  clearSelection: () => set({ selectedIds: new Set() }),
}));
```

### D · Data hook con TanStack Query

```ts
// hooks/use-projects.ts
import { useQuery } from "@tanstack/react-query";

export const useProjects = (userId: string) =>
  useQuery({
    queryKey: ["projects", userId],
    queryFn: () =>
      fetch(`/api/projects?userId=${userId}`).then((r) => r.json()),
    staleTime: 60_000,
  });
```

### E · Form con zod + RHF

```tsx
const schema = z.object({
  name: z.string().min(2).max(80),
  description: z.string().max(500).optional(),
});
type FormValues = z.infer<typeof schema>;

const { register, handleSubmit, formState } = useForm<FormValues>({
  resolver: zodResolver(schema),
});
```

## Checklist al cerrar la pasada

- [ ] HTML semántico (no `<div>` para todo).
- [ ] Headings jerárquicos correctos (`h1` único por página).
- [ ] Roles ARIA solo donde el HTML semántico no alcanza.
- [ ] Estado UI en Zustand si aplica; sin prop drilling > 2 niveles.
- [ ] Data fetching donde corresponde (server > client > RQ).
- [ ] Cero `any`, cero `console.log`, cero estilos inline.
- [ ] Componente < 200 líneas; si excede, descomponer.

## Constraints / Do NOT

- NO empezar con CSS, motion ni librería UI premium en esta pasada — eso es P2 y P5.
- NO meter llamadas a API en componentes presentacionales; pasar por hooks o services.
- NO usar `useEffect` para fetching salvo que no haya alternativa (RSC, RQ, RSC actions cubren todo).
- NO inventar utilidades nuevas si shadcn ya las trae.
- NO instalar dependencias en esta pasada — solo pedir aprobación al usuario y suspender.
