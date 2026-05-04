# Secuencia de Prompts: Primera Iteración

> Estos prompts están diseñados para ser usados en **Lovable** o **v0** como punto de partida.

## Prompt 1: El Foundation (Design System & Layout)
```text
Actúa como un desarrollador frontend senior. Crea la base de una landing page premium para "Instituto Viviendo en USA".
ESTILO: Glassmorphic Luxury con toques de Dark Tech.
PALETA: Base oklch(12% 0.02 270) (Azul noche profundo), Acento oklch(72% 0.18 200) (Azul eléctrico) y Champagne para highlights.
TIPOGRAFÍA: Inter Display para headings, Inter para body.
STACK: React, Tailwind CSS v4, shadcn/ui, Framer Motion, Lucide React.
ESTRUCTURA: Layout principal con Header sticky (Logo, Nav: Comunidad, Cursos, Eventos, FAQ, CTA: Auditoría Gratis) y Footer de 4 columnas.
REGLA: Usa CSS variables para todo el sistema de color, respeta prefers-reduced-motion.
```

## Prompt 2: El Hero & Captación (Lead Magnet)
```text
Sobre la base anterior, implementa la Hero Section.
RECETA: hero-kinetic-title-3d-mockup.
CONTENIDO:
- H1: "Desbloquea el crédito que aprueba el futuro de tu familia."
- Subtítulo: "Auditoría gratuita y educación financiera diseñada para la comunidad hispana en USA. De 0 a 700+ puntos sin complicaciones."
- CTA Primario: "Iniciar Auditoría Gratuita" (con efecto shimmer).
- Visual: Un medidor de Credit Score interactivo (SVG/Lottie) que reaccione al hover.
- Trust Bar: Logos de Stripe, HighLevel y métrica "Más de 5,000 familias transformadas".
```

## Prompt 3: La Escalera de Valor (Ofertas Core)
```text
Agrega las secciones de valor:
1. PAIN POINT: Slider interactivo comparando "Vida con mal crédito" (Gris/Restringido) vs "Vida con buen crédito" (Vívido/Libre).
2. COMUNIDAD VIP: Sección tipo Bento Grid resaltando: Soporte WhatsApp 24/7, Clases en vivo, Biblioteca de recursos y Plantillas de disputa.
3. CURSOS: Grid de dos cards premium para "Crédito Personal" y "Crédito Comercial", cada una con su precio de $297 y lista de beneficios. Usa efectos de vidrio (glassmorphism) y bordes con glow sutil.
```

## Prompt 4: Autoridad y Confianza (Social Proof)
```text
Implementa la sección de Social Proof:
1. TESTIMONIOS: Un marquee infinito de tarjetas con testimonios reales. Cada tarjeta debe tener foto, nombre, resultado cuantificable (ej: "Subí 120 puntos en 3 meses") y logo de verificación.
2. EXPERTO: Sección biográfica de Vojmir Viadilo con foto profesional a sangre (Editorial Dramatic) y sus credenciales como experto en finanzas hispanas.
3. GARANTÍA: Bloque de confianza resaltando seguridad de datos y garantía de satisfacción.
```

## Prompt 5: El Cierre y Conversión (FAQ & Footer)
```text
Finaliza la landing con:
1. FAQ: 8 preguntas frecuentes usando Accordion de shadcn. Enfócate en objeciones: "¿Es legal?", "¿Cuánto tiempo toma?", "¿Necesito Seguro Social?".
2. CTA FINAL: Sección con Aurora Background animado. H2: "¿Listo para cambiar tu historia financiera?". Botón gigante "Quiero mi Auditoría Gratis".
3. FOOTER: Links legales, redes sociales y selector de idioma (Español/English).
Asegura que el LCP sea óptimo y que el smooth scroll con Lenis esté configurado globalmente.
```
