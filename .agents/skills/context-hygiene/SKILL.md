---
name: context-hygiene
description: Mantiene la salud cognitiva del agente externalizando memoria a STATE.md y aplicando políticas de purga de contexto entre tareas. Activar al inicio de cada sesión, después de cerrar una rebanada, o cuando la conversación supere ~10 intervenciones sostenidas.
---

# Context Hygiene

## Objetivo
Combatir el "Context Rot" (degradación de contexto) que sufren los LLMs cuando una conversación crece. Sin higiene, el agente olvida decisiones tempranas, alucina APIs que ya descartaste y reescribe código estabilizado.

## Principios

1. **El sistema de archivos es la memoria larga, no el chat.** Si una decisión importa, va a `CONTEXT.md`. Si un estado importa, va a `STATE.md`.
2. **Una sesión = una unidad funcional**. Si cambia el objetivo, abrí sesión nueva.
3. **Purga proactiva**, no reactiva. No esperes a notar que el agente alucina.

## Instrucciones operativas

### A · Al inicio de cada sesión
1. Leer `docs/STATE.md` completo.
2. Leer `docs/CONTEXT.md` completo (decisiones D-NN).
3. Leer la sección correspondiente del `docs/PLAN.md` si hay fase activa.
4. Producir un resumen de **3 bullets** confirmando el estado actual antes de cualquier acción.

### B · Durante la sesión
- Cada vez que se tome una decisión arquitectónica, agregarla a `CONTEXT.md` con un identificador `D-NN` y dos líneas de justificación.
- Cada vez que se cierre una sub-tarea, anotar en `STATE.md`:
  ```
  ## YYYY-MM-DD HH:MM
  - [done] T-X / S-Y: descripción breve
  - [pending] T-X+1: blocker / próximo paso
  ```
- Cada vez que aparezca un bloqueo, anotar en `STATE.md` bajo `<issue id="ISS-NN">` con detalle.

### C · Al cerrar la sesión
1. Sintetizar lo hecho en `STATE.md` con timestamp.
2. Marcar la siguiente tarea en `<next>` para que la próxima sesión arranque sabiendo dónde retomar.
3. Si quedaron > 8 mensajes con código generado, recomendar al usuario `/clear` antes de retomar.

### D · Política de "purga proactiva"

| Disparador                                     | Acción                                                         |
|------------------------------------------------|----------------------------------------------------------------|
| Se cierra una rebanada vertical                | `/clear` antes del próximo slice                               |
| Cambia el dominio (de auth a billing)          | `/clear`                                                       |
| > 10 intercambios continuos                    | Sintetizar a `STATE.md`, sugerir `/clear`                      |
| El agente repitió un error 2 veces              | `/clear` y sesión limpia con contexto fresco desde STATE/CONTEXT|
| Aparición de alucinación (API inventada)       | `/clear` inmediato                                             |

### E · Fórmula de re-hidratación rápida
Cuando abrís sesión nueva, pegale este preámbulo al agente:

```
Activá context-hygiene y rpiv-gate.
Leé docs/STATE.md, docs/CONTEXT.md y la fase activa del docs/PLAN.md.
Resumime en 3 bullets dónde estamos y cuál es la próxima tarea.
NO escribas código todavía.
```

## Diseño de STATE.md (referencia)
Ver `templates/gsd/STATE.md` para el esquema completo. Mínimo:

```markdown
# STATE

## Current focus
Fase 2 / S-3 — Sistema de comentarios

## Last session (2026-MM-DD)
- [done] S-2: form de comment + zod
- [pending] S-3: rate-limit y honeypot
- [issue ISS-04] Sentry no captura errores de Server Actions; investigar

## Next
Implementar S-3 con rpiv-gate. Verificar que ISS-04 no bloquee.
```

## Constraints / Do NOT

- NO confiar en "lo que recuerdo de hace 50 mensajes". Si no está en `CONTEXT.md` o `STATE.md`, no es confiable.
- NO sintetizar `STATE.md` a final de sesión con frases vagas ("hicimos cosas de auth"). Detalle específico siempre.
- NO eliminar entradas históricas de `STATE.md`; solo agregar.
- NO mezclar issues abiertos con issues cerrados; usar `<status>` explícito.
- NO sugerir `/clear` mientras hay código sin commitear; commitear primero.
