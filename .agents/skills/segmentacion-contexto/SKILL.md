---
name: segmentacion-contexto
description: "Planificación y segmentación de tareas en microtareas para optimizar el uso de ventanas de contexto. Úsalo para: proyectos complejos, modelos con contexto limitado, y para evitar errores por pérdida de atención en tareas largas."
---

# Segmentación de Contexto

Esta skill permite trabajar con proyectos extensos dividiendo la carga cognitiva y el contexto en unidades manejables (microtareas). Es vital para mantener la precisión cuando se trabaja con modelos de distintos niveles de potencia.

## 1. El Flujo de Segmentación

Antes de ejecutar cualquier tarea compleja, el agente debe realizar una fase de planificación obligatoria:

1. **Análisis de Contexto Completo**: Leer todos los archivos relevantes del proyecto para entender la "big picture".
2. **Identificación de Dependencias**: Determinar qué partes del código dependen de otras.
3. **Fraccionamiento (Slicing)**: Dividir el objetivo principal en microtareas que no excedan las 200 líneas de código o un alcance funcional específico.
4. **Encapsulación de Contexto**: Para cada microtarea, definir exactamente qué archivos y qué información mínima necesita el agente para completarla sin "perderse".

## 2. Definición de Microtareas

Una microtarea bien definida debe cumplir con el criterio **S.M.A.R.T.** y además:
- **Atómica**: Se puede completar en una sola iteración.
- **Independiente**: (Idealmente) No requiere cambios simultáneos en otras microtareas.
- **Verificable**: Tiene un criterio de aceptación claro (ej. "El test X pasa").

## 3. Gestión de Ventanas de Contexto

| Nivel de Modelo | Estrategia de Contexto |
| :--- | :--- |
| **Potente (GPT-4/Claude 3.5)** | Puede manejar el `PLAN.md` completo y referencias cruzadas. |
| **Ligero (Haiku/Flash)** | Entregar solo el fragmento de código a editar y la interfaz de la función a llamar. |
| **Limitado** | Entregar solo la microtarea actual y el `STATE.md` resumido. |

## 4. Protocolo de Entrega de Tareas

Al planificar, genera una tabla de microtareas en el `PLAN.md` siguiendo este formato:

| ID | Microtarea | Contexto Requerido | Criterio de Éxito | Estado |
| :--- | :--- | :--- | :--- | :--- |
| T-1 | Definir Schema Zod | `db/schema.ts` | Validación de tipos correcta | `todo` |
| T-2 | Crear Componente UI | `T-1`, `UI-SPEC.md` | Renderizado sin errores | `todo` |

## 5. Higiene de Contexto

- **Limpieza**: Después de completar 2-3 microtareas, realizar un `/clear` y rehidratar solo con el `STATE.md` actualizado.
- **Resumen**: Nunca pasar a la siguiente microtarea sin haber actualizado el estado global del proyecto.
