---
name: rpiv-gate
description: Aplica el ciclo metodológico RPIV (Research, Plan, Implement, Validate) como puerta bloqueante para cualquier cambio que supere las 200 líneas, toque más de 2 archivos, modifique schema de DB, agregue dependencias o altere lógica de auth/pagos. Activar siempre antes de implementar features no triviales.
---

# RPIV Gate

## Objetivo
Reemplazar el patrón "el agente escribe primero y arregla después" por un ciclo deterministicamente seguro: investigar contexto, planear cambios, implementar acotadamente, validar resultado. Es la barrera que separa código que llega a producción del código que se tira.

## Cuándo activar (mandatorio)
- Cualquier diff anticipado > 200 líneas.
- Tocar > 2 archivos en una misma operación.
- Modificar `schema.ts`, migrations, `package.json`.
- Tocar middleware de auth, billing, webhooks.
- Iniciar una fase nueva del `ROADMAP.md`.

## Ciclo RPIV — operación paso a paso

### Fase R · Research (NO escribir código)
1. Leer en este orden: `docs/STATE.md` → `docs/CONTEXT.md` → `docs/PLAN.md` (si existe la fase) → archivos directamente afectados.
2. Si hay librerías nuevas involucradas, leer su README/docs en `references/` o vía `web-fetch`.
3. Producir un párrafo de **reformulación estructural** en lenguaje llano: "Lo que entendí que hay que hacer es X, tocando Y, sin romper Z".
4. Esperar **OK explícito** del usuario antes de pasar a Plan.

### Fase P · Plan
1. Producir un `PLAN.md` (o sección dentro de él) con esta estructura XML estricta:

```xml
<plan phase="N" generated="<ISO-date>">
  <decisions_referenced>
    <ref id="D-07" />
    <ref id="D-12" />
  </decisions_referenced>
  <tasks>
    <task id="T-1">
      <goal>Crear tabla users con RLS</goal>
      <files>["db/schema.ts", "db/migrations/0001_users.sql"]</files>
      <expected_lines>~80</expected_lines>
      <verification>Output de "drizzle-kit migrate" en verde + RLS test query</verification>
    </task>
    <task id="T-2">…</task>
  </tasks>
</plan>
```

2. Cada decisión arquitectónica relevante de `CONTEXT.md` (D-NN) debe estar referenciada explícitamente en `<decisions_referenced>`. **Si una D crítica falta, rechazar el plan y reformular**.
3. Esperar **OK explícito** del usuario sobre el plan.

### Fase I · Implement
1. Implementar **una sola tarea T-N por iteración**.
2. Cada tarea ≤ 200 líneas de delta. Si la estimación inicial estaba mal, **frenar y refragmentar**.
3. Al terminar cada T-N, marcar la tarea con `<status>done</status>` en el PLAN y solicitar review humano antes de pasar a la siguiente.
4. Commits atómicos por tarea con Conventional Commits: `feat(auth): T-1 users table with RLS`.

### Fase V · Validate
1. Ejecutar la verification declarada en cada tarea (test, curl, screenshot, lint).
2. Para cambios UI: capturar screenshot del estado antes/después.
3. Si la validación falla, NO retocar inmediatamente: **anotar el delta** en `STATE.md` bajo `<issue>`.
4. Si una tarea no puede validarse en 3 intentos → invocar `3-strike-rule`.

## La regla de 3-strikes (incluida en este skill)
Si el ciclo I→V falla 3 veces sobre la misma tarea:
1. Detener iteración automática.
2. Marcar la tarea con `<status>blocked</status>`.
3. Documentar la falla en `STATE.md`.
4. Recomendar al usuario: (a) intervención manual, (b) refragmentar la tarea en sub-tareas, o (c) abrir sesión limpia con contexto pristino.

## Constraints / Do NOT

- NO saltarse la fase R aunque parezca "obvio". El "obvio" es donde alucinas APIs.
- NO marcar un PLAN como ejecutable si falta referenciar decisiones críticas de `CONTEXT.md`.
- NO ejecutar > 1 tarea T-N por iteración sin OK humano.
- NO reabrir tareas marcadas `<status>blocked</status>` sin sesión nueva o intervención humana.
- NO reescribir el plan a mitad de ejecución; si emerge necesidad, frenar I, volver a P.

## Few-Shot Example

**Input del usuario**: "Agregame login con Google".

**Salida correcta del agente**:
> Activando rpiv-gate. Fase R en progreso.
>
> Leí `STATE.md`, `CONTEXT.md` y la sección de auth en `REQUIREMENTS.md`. Veo que:
> - D-04 dictamina Better Auth como provider.
> - D-09 exige cookies httpOnly.
> - REQ-014 incluye solo Google y email-magic-link.
>
> **Reformulación**: Voy a configurar Better Auth con plugin de Google OAuth, generar las rutas `/api/auth/[...all]`, agregar middleware de protección a `/dashboard/*`, y persistir el provider en la tabla users existente. Tocando 4 archivos, ~150 líneas. **¿OK para pasar a Plan?**

**Lo que NO debe hacer**: empezar a escribir `auth.ts` antes del OK.
