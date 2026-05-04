# Magic Section Recipes · Catálogo

> Recetas concretas para que cada sección de un sitio web sea memorable, no genérica. Consumido por `business-research-curator` (Fase 4) y por `magic-section-designer` (skill de aplicación).

> **Convención**: cada receta tiene `id`, descripción, librerías, intensidad, `funciona-con` (estilos compatibles) y `evitar-en` (estilos donde no encaja). El blueprint de la skill curadora referencia las recetas por `id`.

---

## A · HERO sections

Donde se gana o se pierde el visitante.

### A.1 · `hero-kinetic-title-3d-mockup`
Headline grande con reveal letra-por-letra; al lado o debajo, mockup 3D del producto flotando con leve rotación al mover mouse.
- **Libs**: `framer-motion` (text reveal), `react-three-fiber` + `drei` (mockup) o `spline` (no-code).
- **Intensidad**: alta. **Funciona con**: Kinetic Cinematic, Glassmorphic Luxury. **Evitar en**: Minimal Refined, Organic Warm.
- **A11y**: fallback estático con headline simple para reduced-motion. Aria-label en mockup.
- **Performance**: 3D model ≤ 300kb compressed; lazy-load post-LCP si > 500kb.

### A.2 · `hero-video-background-overlay`
Loop de video silencioso (≤ 6s, ≤ 1.5MB AV1/AVIF) ocupando el fondo, con overlay degradado y headline + CTA en primer plano.
- **Libs**: `<video>` con poster, `next/image` para poster, FM para entrada del headline.
- **Intensidad**: media-alta. **Funciona con**: Kinetic Cinematic, Editorial Dramatic, Organic Warm.
- **A11y**: control de play/pause visible si > 5s; fallback poster en reduced-motion.
- **Performance**: poster AVIF first; video lazy si below the fold; preferir `loop muted playsinline`.

### A.3 · `hero-aurora-mesh-gradient`
Fondo con mesh gradient animado en colores de la paleta, headline y CTA flotando encima.
- **Libs**: `paper-shaders`, `aceternity-ui` (BackgroundGradient), o componente custom WebGL.
- **Intensidad**: media. **Funciona con**: Glassmorphic Luxury, Neo-Vivid, Kinetic Cinematic.
- **A11y**: validar contraste sobre el gradient (4.5:1); congelar animación en reduced-motion.

### A.4 · `hero-beam-spotlight-dark`
Beam de luz animado en fondo dark, sparkles sutiles, headline grande con eyebrow distintivo.
- **Libs**: `aceternity-ui` (Spotlight, Sparkles), `magic-ui` (animated beam), FM.
- **Intensidad**: alta. **Funciona con**: Kinetic Cinematic, Dark Tech, Glassmorphic Luxury (modo dark).
- **Performance**: SVG/Canvas; cuidar pintura en mobile.

### A.5 · `hero-asymmetric-split-editorial`
Lado izquierdo headline grande + eyebrow + CTA. Lado derecho fotografía editorial recortada o ilustración a sangre.
- **Libs**: solo CSS Grid + FM para reveal por palabra.
- **Intensidad**: media. **Funciona con**: Editorial Dramatic, Brutalist Bold, Organic Warm.
- **Requiere**: fotografía propia de calidad. Sin foto buena, no usar.

### A.6 · `hero-marquee-headline`
Headline en marquee horizontal continuo (con o sin pausa), variando palabras claves, CTA estable abajo.
- **Libs**: `magic-ui` (Marquee), `framer-motion`.
- **Intensidad**: alta. **Funciona con**: Brutalist Bold, Retro Futurism, Maximalist Layered, Editorial Dramatic.
- **A11y**: marquee con `aria-hidden`; texto accesible duplicado fuera de pantalla; pausable on focus.

### A.7 · `hero-scroll-bound-storytelling`
Hero ocupa 200-300vh. Al hacer scroll, el headline cambia en stages, el visual evoluciona (zoom, color shift, escena).
- **Libs**: `gsap` + `ScrollTrigger`, `lenis`, FM para microelementos.
- **Intensidad**: muy alta. **Funciona con**: Kinetic Cinematic, Brutalist Bold, Editorial Dramatic.
- **Performance**: budget alto; verificar 60fps mobile mid-range.

### A.8 · `hero-particles-canvas-interactive`
Canvas de partículas que reaccionan al mouse o scroll (constellation, fluid, tsparticles).
- **Libs**: `tsparticles`, `aceternity-ui` (Vortex), o custom canvas.
- **Intensidad**: alta. **Funciona con**: Dark Tech, Kinetic Cinematic, Retro Futurism.
- **A11y**: pausable; reduced-motion = canvas estático.

### A.9 · `hero-handwritten-overlay`
Foto / video cálido como base; overlay de texto manuscrito que se "dibuja" en SVG path animado.
- **Libs**: SVG path + `framer-motion` `pathLength`, fotografía propia, `lottie-react` si la firma es lottie.
- **Intensidad**: media. **Funciona con**: Organic Warm, Editorial Dramatic.
- **Requiere**: firma o frase manuscrita propia (no Caveat web font).

### A.10 · `hero-glitch-rgb-shift`
Headline con chromatic aberration glitch que pulsa por 1-2 frames cada 6-10s, fondo retro.
- **Libs**: CSS filter + FM keyframes, o shader custom.
- **Intensidad**: alta. **Funciona con**: Retro Futurism, Brutalist Bold, Dark Tech.
- **A11y**: reduced-motion → estático; evitar epilepsia (no flashes > 3/s).

---

## B · TRUST BAR / Social proof inmediato (post-hero)

### B.1 · `trust-marquee-logos-grayscale`
Marquee infinito horizontal de logos en grayscale 50% que se colorean al hover.
- **Libs**: `magic-ui` (Marquee), CSS filters.
- **Funciona con**: prácticamente todos los estilos.

### B.2 · `trust-static-grid-with-metric`
Grid estático de 5-7 logos + 1 métrica grande ("USD 4.2M procesados", "247 clientes").
- **Funciona con**: Editorial Dramatic, Glassmorphic Luxury, Minimal Refined.

### B.3 · `trust-rotating-quotes`
Tarjeta única que rota entre testimoniales cortos (1 cada 4s), con avatar + métrica.
- **Libs**: FM AnimatePresence.
- **Funciona con**: Glassmorphic Luxury, Kinetic Cinematic, Organic Warm.

### B.4 · `trust-brutalist-stamp`
Tipografía oversize "TRUSTED BY <client>" rotando en lugar de logos limpios.
- **Funciona con**: Brutalist Bold, Editorial Dramatic.

---

## C · FEATURES / Value props

### C.1 · `features-bento-asymmetric`
Grid bento con celdas de tamaños variables; cada feature con un visual distinto (icon, mini-chart, mockup).
- **Libs**: CSS Grid, FM para reveal staggered, `magic-ui` (animated grid).
- **Intensidad**: media-alta. **Funciona con**: Kinetic Cinematic, Glassmorphic Luxury, Neo-Vivid.

### C.2 · `features-tabbed-deep-dive`
3-5 features como tabs; al hacer click, el panel se transforma con animación (FLIP) mostrando demo o mockup.
- **Libs**: `radix-ui` (Tabs), FM layout transitions.
- **Funciona con**: SaaS, productos con varias funcionalidades.

### C.3 · `features-sticky-scroll-storytelling`
Sidebar sticky con índice de features; el contenido scrollea pasando por cada uno con animaciones de entrada.
- **Libs**: `gsap` ScrollTrigger, `lenis`, FM.
- **Intensidad**: alta. **Funciona con**: Kinetic Cinematic, Editorial Dramatic.

### C.4 · `features-before-after-slider`
Drag slider que revela el "antes" vs "después" del problema/solución.
- **Libs**: `react-compare-slider` o custom.
- **Funciona con**: productos con resultado visual claro (diseño, salud, real estate, marketing).

### C.5 · `features-3d-rotating-gallery`
Galería de cards de features que rotan en 3D (carousel cilíndrico).
- **Libs**: R3F + `drei` (Carousel), o CSS 3D transforms.
- **Funciona con**: Kinetic Cinematic, Glassmorphic Luxury.

### C.6 · `features-organic-shapes-narrative`
Cada feature en una "burbuja" orgánica con texto y micro-ilustración Lottie.
- **Libs**: `lottie-react`, SVG blob shapes, FM.
- **Funciona con**: Organic Warm, Neo-Vivid.

### C.7 · `features-comparison-table-animated`
Tabla comparando "ellos vs nosotros" con celdas que se animan al entrar (highlight reveal).
- **Funciona con**: SaaS, e-commerce, fintech.

### C.8 · `features-marquee-icons-text`
Marquee horizontal con pares ícono + título de cada feature (dos filas en direcciones opuestas).
- **Libs**: `magic-ui` (Marquee).
- **Funciona con**: Kinetic Cinematic, Brutalist Bold, Maximalist.

---

## D · DEMO / Producto en acción

### D.1 · `demo-device-mockup-floating`
Mockup de laptop o mobile con screenshot interactivo, flotando con leve rotación al scroll.
- **Libs**: PNG/SVG mockup, FM `whileInView` con tilt.
- **Funciona con**: SaaS, apps.

### D.2 · `demo-video-loop-with-controls`
Video loop muted del producto en uso, con controles de play/pause/sound visibles.
- **Funciona con**: la mayoría.

### D.3 · `demo-interactive-product-tour`
Mini-tour interactivo (3-5 pasos) navegable con flechas o auto-advance, mostrando partes del producto.
- **Libs**: FM AnimatePresence, custom state machine.
- **Funciona con**: SaaS, apps complejas.

### D.4 · `demo-screenshots-tilted-stack`
Stack de 3-5 screenshots apilados con leve rotación, parallax al scroll.
- **Libs**: FM scroll-linked transforms.
- **Funciona con**: SaaS, apps.

### D.5 · `demo-3d-scene-spline`
Escena 3D del producto navegable con cámara controlable.
- **Libs**: Spline (export iframe) o R3F custom.
- **Intensidad**: muy alta. Cuidar performance.

---

## E · TESTIMONIALS / Social proof

### E.1 · `testimonials-marquee-card-grid`
Marquee infinito de tarjetas de testimoniales en dos filas (opuestas).
- **Libs**: `magic-ui` (Marquee).

### E.2 · `testimonials-card-stack-carousel`
Stack 3D de cards; al avanzar, la card del frente sale por arriba y la siguiente toma su lugar.
- **Libs**: FM layout, custom stack.
- **Funciona con**: Glassmorphic Luxury, Kinetic Cinematic.

### E.3 · `testimonials-tweet-style-grid`
Grid de cards estilo Twitter con avatar, handle, quote, métrica de likes.
- **Funciona con**: Neo-Vivid, Maximalist Layered, Kinetic Cinematic.

### E.4 · `testimonials-video-inline-grid`
Grid de mini-videos (≤ 30s) de clientes; click expande modal con video completo.
- **Libs**: `mux-player` o `react-player`.
- **Requiere**: videos reales del cliente.

### E.5 · `testimonials-portrait-quote-editorial`
Foto a sangre del cliente + quote grande tipo editorial.
- **Funciona con**: Editorial Dramatic, Organic Warm.
- **Requiere**: fotografía profesional propia.

---

## F · PRICING

### F.1 · `pricing-floating-cards-glass`
3 cards flotantes con glass effect, plan central destacado con glow y leve scale.
- **Libs**: `cult-ui`, FM hover.
- **Funciona con**: Glassmorphic Luxury, Kinetic Cinematic.

### F.2 · `pricing-flip-toggle-monthly-annual`
Switch annual/monthly que dispara FLIP animation en los precios (los números literalmente flipean).
- **Libs**: FM layout, AnimatePresence.

### F.3 · `pricing-magnetic-glow-featured`
Plan central con borde gradient animado infinito (border-rainbow) y CTA con glow.
- **Libs**: `aceternity-ui` (BorderBeam, MovingBorder).

### F.4 · `pricing-comparison-sticky-table`
Tabla comparativa con header sticky; columnas = planes, filas = features con check/cruz.
- **Funciona con**: SaaS B2B, productos con diferenciación clara.

### F.5 · `pricing-aurora-background-cards`
Background con aurora gradient animado, cards encima con glassmorphism leve.
- **Libs**: `aceternity-ui` (AuroraBackground).

### F.6 · `pricing-brutalist-stamps`
Cards con borders gruesos, sin radius, números oversize tipo cartel.
- **Funciona con**: Brutalist Bold, Editorial Dramatic.

---

## G · FAQ

### G.1 · `faq-accordion-classic-animated`
Accordion shadcn/Radix con FM layout para apertura suave.
- **Default seguro**.

### G.2 · `faq-two-column-cards`
2 columnas de FAQ-cards estáticos sin accordion (todas las respuestas visibles).
- **Funciona con**: cuando hay 4-6 preguntas y todas son cortas.

### G.3 · `faq-search-with-categories`
FAQ con search input + filtro por categoría; resultados se filtran live.
- **Funciona con**: SaaS, e-commerce con > 15 preguntas.

### G.4 · `faq-conversational-chat-style`
Lista de FAQ presentada como chat (avatar de cliente / avatar de la marca).
- **Funciona con**: Organic Warm, Neo-Vivid.

---

## H · CTA / Closing

### H.1 · `cta-aurora-with-inline-form`
Sección a sangre con aurora gradient, título grande + form de email inline.
- **Libs**: `aceternity-ui` (AuroraBackground), FM, RHF + zod.

### H.2 · `cta-newsletter-confetti-success`
Form de newsletter; al éxito, lluvia de confetti + microcopy "Listo, revisá tu inbox".
- **Libs**: `react-confetti`, FM, Resend.

### H.3 · `cta-calendar-booking-inline`
Slot picker (Cal.com embed o custom) inline en la sección.
- **Libs**: `cal.com` embed, o `react-day-picker`.
- **Funciona con**: agencias, consultores, servicios.

### H.4 · `cta-shimmer-button-magnetic`
CTA gigante con shimmer animado y efecto magnético al mouse.
- **Libs**: `magic-ui` (ShimmerButton, MagneticButton).

### H.5 · `cta-final-statement-marquee`
Frase final masiva en marquee (statement de cierre).
- **Funciona con**: Brutalist Bold, Maximalist Layered.

---

## I · NAVIGATION / Header

### I.1 · `nav-minimal-sticky-blur`
Header sticky con `backdrop-filter: blur` al scroll, padding reduce.
- **Default refinado**.

### I.2 · `nav-mega-menu-animated`
Hover en items de nav abre mega-menu con preview de contenido y animación.
- **Funciona con**: SaaS, e-commerce con catálogos amplios.

### I.3 · `nav-command-palette-cmdk`
⌘K command palette accesible desde el header (replace search).
- **Libs**: `cmdk`.
- **Funciona con**: SaaS, dev tools, productos densos.

### I.4 · `nav-experimental-vertical`
Sidebar vertical fija con dots o números (estilo single-page editorial).
- **Funciona con**: portfolios, single-page agencies.

---

## J · FOOTER

### J.1 · `footer-massive-statement`
Footer con statement masivo (logo gigante o frase) antes de los links.
- **Funciona con**: Brutalist Bold, Editorial Dramatic.

### J.2 · `footer-newsletter-prominent`
Footer dominado por el form de newsletter, links chicos abajo.

### J.3 · `footer-grid-classic-with-spotlight`
4 cols clásicas + bottom bar con spotlight sutil siguiendo el mouse.

### J.4 · `footer-organic-shapes-warm`
Footer con shapes orgánicas decorativas y firma manuscrita del fundador.
- **Funciona con**: Organic Warm.

---

## K · SECCIONES ESPECÍFICAS POR TIPO

### Para SaaS

#### K.1 · `saas-integration-grid-marquee`
Grid o marquee de logos de integraciones soportadas, animadas.

#### K.2 · `saas-roi-calculator-interactive`
Calculadora interactiva (sliders) que muestra el retorno estimado del producto.

#### K.3 · `saas-changelog-timeline`
Timeline horizontal o vertical de últimos releases con badges "new".

### Para E-commerce

#### K.4 · `ecom-product-card-hover-3d`
Cards de producto que rotan ligeramente en 3D al hover, mostrando segunda foto.

#### K.5 · `ecom-collection-spotlight-grid`
Grid con un producto destacado grande + 4-6 cards regulares.

#### K.6 · `ecom-shoppable-lookbook`
Editorial-style imagen grande con dots interactivos sobre productos visibles.

### Para Landing services

#### K.7 · `services-process-numbered-vertical`
Pasos numerados con stagger reveal, conexión visual entre pasos.

#### K.8 · `services-portfolio-masonry-hover-reveal`
Grid masonry de proyectos; hover revela título + categoría con animación.

### Para corporativo + blog

#### K.9 · `corp-blog-featured-hero`
Post destacado con foto a sangre + grid de posts secundarios debajo.

#### K.10 · `corp-team-grid-portrait-hover`
Grid de team members con foto editorial; hover revela rol + bio breve.

---

## L · MICRO-INTERACTIONS transversales

Aplicables a cualquier sección, suman el "feels alive":

- **Magnetic CTAs** (`magic-ui MagneticButton`): el CTA atrae al cursor.
- **Custom cursor** (con opt-out): cursor reemplazado por un dot que crece en interactivos.
- **Spotlight follow** (`aceternity-ui Spotlight`): luz que sigue al mouse en sección dark.
- **Animated counter**: números que cuentan up al entrar en viewport.
- **Tilt cards**: cards que tiltean según mouse position.
- **Shimmer on text**: highlights brillantes que pasan por palabras claves.
- **Animated underline**: underline que se dibuja al hover en links.
- **Reveal on scroll**: stagger de entrada para cualquier bloque.

---

## M · Reglas de combinación

- **Una "estrella" por scroll viewport**: si hero tiene receta de intensidad alta (A.1, A.7, A.8), la siguiente sección debe ser `media` o `subtle`.
- **No mezclar dos receptas de la misma "categoría visual"** en secciones consecutivas (e.g., dos beams seguidos cansan).
- **Marquees**: máximo 2 por página, en direcciones distintas.
- **Carousels**: máximo 1 por página (testimonials O features-carousel, no los dos).
- **Animaciones globales** (smooth scroll, custom cursor, magnetic): activar para todo el sitio una vez decidido.

---

*Cada receta es un punto de partida. La pasada `motion-polish` y `performance-audit` ajustan la implementación a los budgets reales.*
