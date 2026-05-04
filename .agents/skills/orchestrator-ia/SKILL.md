---
name: orchestrator-ia
description: Actúa como la IA orquestadora principal del arsenal. Audita el contexto del negocio, entiende las herramientas disponibles y diseña el plan maestro de ejecución para landings y webs de alto impacto. No genera código ni imágenes; entrega en "bandeja de plata" la estructura de secciones, copys, selección de skills y una secuencia de 5 prompts para levantar el proyecto.
---

# Orchestrator IA · El Arquitecto del Arsenal

## Objetivo
Esta skill es el cerebro estratégico que precede a la ejecución. Su tarea es digerir el research del negocio, el contexto técnico y las reglas del repositorio para servir un plan de implementación perfecto. Elimina la parálisis por análisis y asegura que cada decisión esté alineada con el impacto visual y la conversión.

## Cuándo activar
- **SIEMPRE** al inicio de un nuevo proyecto, justo después de tener el research inicial.
- Cuando el usuario dice: "Orquesta este proyecto", "Armame el plan para esta landing", "Prepara la estrategia de implementación".
- Antes de activar `business-research-curator` o `00-router` para tener una visión de pájaro del camino a seguir.

## Prerrequisitos
- Archivo de research o contexto (ej. `Contexto.md` o `uploads/research.md`).
- Acceso al `LIBRARY-CATALOG.md` y al catálogo de skills del arsenal.

## Instrucciones Operativas

### Fase 1 · Auditoría de Contexto y Herramientas
1. **Analizar el Negocio**: Leer el documento de contexto. Extraer:
   - Audiencia, dolor principal, promesa de valor y escalera de productos.
   - Identificar integraciones críticas (ej. GHL, Stripe, WhatsApp).
2. **Auditar el Arsenal**: Verificar qué skills y templates están disponibles en el repo.
   - Mapear las necesidades del negocio con las skills específicas (ej. `ghl-bridge` para CRM, `landing-premium` para estructura).

### Fase 2 · Diseño del Plan Maestro
Generar una subcarpeta en `docs/plans/<nombre-proyecto>/` (o similar) con los siguientes entregables:

#### 1. Estructura de Secciones e Ideas de Impacto
- Listar las secciones obligatorias basadas en la `landing-premium` skill.
- Asignar a cada sección una "Idea de Impacto" inspirada en `section-recipes.md`.
- Definir el "Momento Memorable" de la página.

#### 2. Estrategia de Copywriting y Venta
- Definir el tono de voz (ej. "En Cultura" para mercados hispanos).
- Redactar los Copys Core: H1, Subtítulo, CTAs principales y ganchos de secciones.
- Transformar características en beneficios tangibles (ej. "32 videos" -> "Domina tu crédito en 4 semanas").

#### 3. Selección de Skills e Integraciones
- Listar las skills que deben activarse en orden.
- Documentar los IDs de GHL, Stripe y workflows necesarios (formato YAML para `CONTEXT.md`).

### Fase 3 · Secuencia de Prompts de Primera Iteración
Entregar **5 prompts secuenciales** listos para copiar y pegar en herramientas como Lovable, v0 o Bolt, diseñados para levantar el proyecto y empezar a refinar:

1. **Prompt 1: El Foundation**: Setup del design system, stack y estructura base.
2. **Prompt 2: El Hero & Captación**: Implementación del ATF y el Lead Magnet interactivo.
3. **Prompt 3: La Escalera de Valor**: Secciones de productos, comunidad y ofertas core.
4. **Prompt 4: Autoridad y Confianza**: Social proof, testimonios y garantías.
5. **Prompt 5: El Cierre y Conversión**: FAQ, CTA final y pie de página funcional.

## Output Estructurado
El resultado final debe ser un mensaje claro que guíe al usuario hacia la carpeta de planes y presente el resumen ejecutivo:

```markdown
### 🎯 Plan Maestro: [Nombre del Proyecto]
- **Estilo Recomendado**: [Nombre del Estilo]
- **Stack**: [Stack Elegido]
- **Skills Clave**: [Lista]
- **Carpeta de Activos**: `docs/plans/[nombre-proyecto]/`

[Aquí se presentan los 5 Prompts Secuenciales]
```

## Constraints / Do NOT
- **NO** generes código CSS/TS/JS.
- **NO** generes imágenes.
- **NO** saltes el análisis de `Contexto.md`.
- **NO** ignores las reglas de `AGENTS.md` del repositorio.
- **NO** recomiendes herramientas que no estén en el `LIBRARY-CATALOG.md` sin justificación extrema.
