# Visual Styles Catalog · 10 estilos visualmente impactantes

> Catálogo de referencia de la skill `business-research-curator`. Cada estilo incluye señales de cuándo usar, paleta orientativa, tipografía, motion approach, librerías que encajan, sitios de referencia, y trampas a evitar.

> **Regla de uso del catálogo**: la mayoría de proyectos USD 25K cae en uno de los 9 primeros (impacto). El estilo 10 (Minimal Refined) es la EXCEPCIÓN justificada, no el default.

---

## 1 · Editorial Dramatic

**Cuándo usar**: agencias creativas, fashion, beauty, hospitality premium, magazines digitales, portfolios senior, productos de autor, marcas con storytelling fuerte.

**Mood adjectives**: editorial, sofisticado, asimétrico, fotográfico, deliberado.

**Paleta orientativa**:
- Base: `oklch(98% 0.005 60)` (paper warm)
- Texto: `oklch(15% 0.02 30)` (negro tinta)
- Acento: `oklch(55% 0.20 25)` (rojo editorial) o `oklch(45% 0.15 280)` (índigo profundo)
- Sombras dramáticas y paper texture sutil.

**Tipografía**:
- Display: serif editorial bold (PP Editorial New, Tiempos Headline, Migra, Cormorant Garamond).
- Body: sans neutro (Inter, Söhne) o serif legible (Söhne Mono no, Source Serif).
- Escalas grandes en display (h1 ≥ 5rem desktop, sin miedo).
- `letter-spacing: -0.04em` en H1; tracking generoso en uppercase eyebrows.

**Layout**:
- Asimétrico, columnas variables.
- Imágenes con grid editorial (a sangre, recortes deliberados, varias proporciones).
- Mucho aire vertical entre secciones (`--space-32` o más).

**Motion**:
- Reveal por scroll con stagger denso de palabras o letras.
- Hover en imágenes con scale sutil y mask reveal.
- Lenis smooth scroll.
- Respeto férreo a `prefers-reduced-motion`.

**Librerías clave**:
- `framer-motion`, `lenis`, `gsap` (split text), `aceternity-ui` (text reveal), `magic-ui` (text shimmer), `lottie-react` para microelementos.
- Fotografía propia, NO stock.

**Sitios de referencia**:
- pentagram.com, instrumentstudios.com, areof.com, hypebeast.com (versión editorial).

**Trampas**:
- Sin fotografía real propia, este estilo cae plano. Si el cliente no tiene fotos, primero shooting o cambiar de estilo.
- No abusar del serif: máximo 1 familia display + 1 body.
- Cuidar contraste: el modo dark editorial necesita backgrounds cálidos `oklch(8% 0.01 60)`, no negro puro.

---

## 2 · Kinetic Cinematic

**Cuándo usar**: SaaS bold, productos tech con narrativa fuerte, agencias digitales, plataformas de innovación, empresas que venden visión.

**Mood adjectives**: cinemático, en movimiento, narrativo, audaz.

**Paleta orientativa**:
- Modo dual con dominancia dark.
- Base dark: `oklch(8% 0.01 250)`.
- Acento vivo: `oklch(72% 0.22 45)` (amber) o `oklch(70% 0.20 320)` (magenta) o `oklch(72% 0.18 200)` (electric blue).
- Gradientes de acento sobre dark.

**Tipografía**:
- Display: sans variable bold (Inter Display, Söhne Breit, Geist Sans, Aeonik).
- Posibilidad de mono accent (Berkeley Mono, JetBrains Mono).
- Escalas muy grandes con `letter-spacing: -0.04em`.

**Layout**:
- Full-bleed por sección, sticky scroll telling, parallax controlado.
- Pantallas/tableros como protagonista; mockups 3D.

**Motion**:
- **Es el alma del estilo**. GSAP ScrollTrigger para sticky narratives, FM para componentes interactivos.
- Reveal de headlines por palabra/letra.
- Scroll-bound video o canvas.
- Cursor magnético opcional (con opt-out).
- 3D mockups con R3F o Spline.

**Librerías clave**:
- `framer-motion`, `gsap` + `ScrollTrigger`, `lenis`, `react-three-fiber` + `drei`, `aceternity-ui` (beam, sparkles, spotlight), `magic-ui` (animated beam, marquee).

**Sitios de referencia**:
- linear.app, vercel.com, framer.com, arc.net, runwayml.com, antigravity-style sites.

**Trampas**:
- Performance: 3D y video pesados pueden tirar LCP. Forzar `motion-polish` y `performance-audit` con budget mobile estricto.
- Demasiada animación cansa. Una "estrella" por scroll, no 5 simultáneas.
- A11y: respetar reduced-motion sí o sí, con fallback de poster estático.

---

## 3 · Glassmorphic Luxury

**Cuándo usar**: fintech premium, neobancos, productos de inversión, salud premium, real estate alto, joyería, hospitality 5 estrellas, servicios profesionales premium (legal/contable boutique).

**Mood adjectives**: lujoso, etéreo, profundidad, cristalino, premium.

**Paleta orientativa**:
- Base modo claro: `oklch(96% 0.01 250)` con tintes muy suaves.
- Modo oscuro: `oklch(12% 0.02 270)` con highlights metálicos `oklch(75% 0.05 80)` (champagne).
- Acentos translucidos: vidrios `rgba(255, 255, 255, 0.06)` con backdrop-filter blur.
- Gradientes muy sutiles, nunca chillones.

**Tipografía**:
- Display: sans elegante (Söhne, Geist, Neue Haas Grotesk).
- Body sans del mismo eje.
- Light/regular weights dominantes (300-500), bold solo en headlines clave.
- Tracking ajustado en H1, abierto en eyebrows.

**Layout**:
- Cards flotantes con `backdrop-filter: blur(...)` + border `1px solid rgba(255,255,255,0.08)` + sombra suave.
- Generoso uso de profundidad (z-index visual).
- Floating UI elements con micro-paralaje.

**Motion**:
- Sutil siempre. Hover scale 1.02, sombra que crece.
- Glass elements con micro-shimmer.
- 3D opcional (R3F) con objetos premium (icons metálicos, geometrías limpias).
- Mesh gradient lento de fondo.

**Librerías clave**:
- `framer-motion`, `cult-ui` (glass dialogs/popovers), `aceternity-ui` (glassmorphism cards, spotlight), `magic-ui` (orbiting beams, particles), `r3f + drei` para hero objects, `paper-shaders` o mesh gradient custom.

**Sitios de referencia**:
- apple.com (segments premium), ramp.com, linear.app (some sections), revolut.com landing campaigns, arc.net.

**Trampas**:
- `backdrop-filter` performance en mobile mid-range; testear y ajustar.
- A11y: contraste sobre vidrio puede caer; reforzar `text-shadow` o capa de tinta debajo.
- Icons baratos arruinan el luxury. Usar set custom o de pago (e.g., Streamline, Nucleo).

---

## 4 · Neo-Vivid

**Cuándo usar**: consumer apps, herramientas creativas, productos D2C, ed-tech para jóvenes, gaming casual, social tools, plataformas de creators.

**Mood adjectives**: vibrante, energético, juguetón, contemporáneo, accesible.

**Paleta orientativa**:
- Saturadas y de alto contraste.
- 2-3 colores primarios fuertes: `oklch(72% 0.20 145)` (verde lime), `oklch(70% 0.20 35)` (coral), `oklch(75% 0.18 280)` (lavanda).
- Mesh gradients animados como fondo.
- Soporta light + dark; en dark los acentos brillan más.

**Tipografía**:
- Sans geométrica con personalidad (Geist, Söhne, Inter Variable, Outfit, Sora).
- Posibilidad de display alternativo (Migra, Boogy Brown) para hero.
- Más liberal con weights y sizes.

**Layout**:
- Bento grids asimétricas con cards de colores fuertes.
- Bloques redondeados (`--radius-2xl: 28px`).
- Stickers, ilustraciones custom, emojis sí pero usados con criterio.

**Motion**:
- Spring physics, micro-bounces.
- Mesh gradient animado vivo en hero.
- Spring on hover, FLIP layout transitions.
- Lottie para reacciones e ilustraciones.

**Librerías clave**:
- `framer-motion`, `lottie-react`, `magic-ui` (animated beam, particles, marquee), `aceternity-ui` (background gradient animation, sparkles), `paper-shaders` (mesh gradient), `tailwindcss-animate`.

**Sitios de referencia**:
- figma.com (campaigns), notion.so, perplexity.ai, retool.com, raycast.com, descript.com.

**Trampas**:
- Saturación excesiva fatiga: usar 2-3 colores principales y monocroma + acentos en el resto.
- Sin sistema, deriva en chiclera. Tokens estrictos en UI-SPEC.
- En B2B serio puede leerse "no profesional"; usar para audiencias jóvenes/digitales.

---

## 5 · Brutalist Bold

**Cuándo usar**: design agencies, fashion forward, marcas de autor, productos culturales, plataformas creativas con voz propia, manifesto-driven brands.

**Mood adjectives**: crudo, desafiante, sin filtros, deliberado, personalidad.

**Paleta orientativa**:
- Mono base + 1 acento fuerte (`oklch(60% 0.22 25)` rojo o `oklch(95% 0.20 100)` lima eléctrico).
- Negro `oklch(5% 0)` y blanco `oklch(99% 0)` puros sin warmth.
- Sin gradients, sin sombras suaves.

**Tipografía**:
- Display oversized, mezcla bold sans + condensed.
- Posible mix de serif anti + sans grotesque.
- Tipografías con personalidad (PP Editorial Old, GT Sectra, GT America Mono, NaN Tundra).
- Tracking experimental.

**Layout**:
- Cuadrículas crudas, bordes hard, líneas gruesas.
- Type as image: titular usado como composición.
- Cero `border-radius`, o radius hyper grandes (50px+).
- Mucho contraste vacío vs denso.

**Motion**:
- Crudo: jumps, snaps, scroll-jacking deliberado.
- Cero spring suave; transiciones lineares cortas.
- Cursor custom opcional grande y agresivo.

**Librerías clave**:
- `framer-motion` (sin springs), `gsap` (scrub timelines), tipografías de Pangram Pangram / Klim / NaN.
- Iconos custom o NaN, no lucide.

**Sitios de referencia**:
- bench.so, basement.studio, lusion.co, builttoshow.com, luminance.co, rauno.me.

**Trampas**:
- Si el cliente es conservador, puede odiar el estilo. Confirmar antes con benchmark explícito.
- A11y: contrastes pueden ser AAA fácil pero el motion brusco necesita reduced-motion serio.
- Performance: tipografías custom pesan; subset estricto.

---

## 6 · Organic Warm

**Cuándo usar**: wellness, food, lifestyle, e-commerce artesanal/premium, marcas con storytelling humano, salud holística, hospitalidad warm, marcas con propósito.

**Mood adjectives**: cálido, táctil, humano, natural, narrativo.

**Paleta orientativa**:
- Bases cálidas: `oklch(95% 0.02 65)` cream, `oklch(92% 0.04 50)` beige.
- Acentos terrosos: `oklch(55% 0.13 30)` terracotta, `oklch(45% 0.10 110)` olive, `oklch(40% 0.06 260)` deep blue ink.
- Gradients suaves entre tonos análogos.
- Modo dark: chocolate `oklch(15% 0.03 30)` con acentos ámbar.

**Tipografía**:
- Mix display serif elegante (PP Editorial New, Söhne Mono / Söhne, Söhne Schmal, Tiempos) + cursiva manuscrita opcional para acentos (Recoleta, BluuNext, Caveat para handwriting).
- Body serif legible o sans cálido.

**Layout**:
- Curvas en lugar de cuadrículas duras.
- Photography natural, recortes orgánicos.
- Texturas de paper, grano sutil.
- Forms orgánicas (blob shapes, watercolor washes).

**Motion**:
- Lento y suave, easings con peso.
- Reveal scrolled con grain noise overlay sutil.
- Lottie para ilustraciones manuscritas que dibujan al entrar.

**Librerías clave**:
- `framer-motion`, `lenis`, `lottie-react`, `magic-ui` (warm sparkles), `aceternity-ui` (text generate effect), texture overlays propios.
- `next/image` con `quality={85}` para preservar la fotografía.

**Sitios de referencia**:
- aesop.com, our-place.com, mejuri.com, oatly.com (warm versions), cosa.com.uy.

**Trampas**:
- Sin fotografía propia de calidad, no funciona. Igual que Editorial Dramatic.
- Cuidar consistencia: si la fotografía es de stock genérico, el estilo se evapora.
- En B2B SaaS puede ser too-soft; mejor para B2C o marcas con alma.

---

## 7 · Dark Tech

**Cuándo usar**: dev tools, cybersecurity, infra cloud, blockchain serio, productos para developers, productos enterprise tech.

**Mood adjectives**: técnico, denso, terminal, preciso, hacker chic.

**Paleta orientativa**:
- Base: `oklch(8% 0 0)` negro casi puro o `oklch(12% 0.01 250)` grafito.
- Acento neon: `oklch(80% 0.20 145)` verde neon o `oklch(72% 0.20 200)` cyan.
- Mono UI con acentos selectivos.
- Sin warmth.

**Tipografía**:
- Mono prominente en hero (Berkeley Mono, JetBrains Mono, IBM Plex Mono, Geist Mono).
- Sans sober en body (Geist Sans, Söhne).
- Number-tabular features activadas.

**Layout**:
- Densidad alta tipo dashboard.
- Líneas finas, dividers explícitos.
- Code blocks como hero element.
- Terminal aesthetic en CTAs.

**Motion**:
- Glitch sutil en hero (RGB shift por 1-2 frames).
- Type-on por terminal.
- Cursor blink en headlines.
- Scroll-bound code reveal.

**Librerías clave**:
- `framer-motion`, `magic-ui` (typing animation, retro grid, animated grid pattern), `aceternity-ui` (vortex, spotlight), `prism-react-renderer` o `shiki` para code, `cobe` para globe.

**Sitios de referencia**:
- vercel.com, supabase.com (dark sections), neon.tech, planetscale.com, anthropic.com, dub.co.

**Trampas**:
- A11y: neon sobre negro a veces no llega a 4.5:1. Validar siempre.
- En audiencias no-tech se ve frío. Para B2C consumer no es buena elección.

---

## 8 · Retro Futurism

**Cuándo usar**: gaming, música, cultura juvenil, productos creativos, plataformas de fans, marcas con humor, NFT/web3 con edge.

**Mood adjectives**: nostálgico, irreverente, vibrante, glitch, cultural.

**Paleta orientativa**:
- 80s/90s revival: `oklch(60% 0.20 320)` magenta vapor, `oklch(70% 0.18 200)` cyan, `oklch(85% 0.15 80)` amarillo CRT.
- Modo dark dominante.
- Chromatic aberration RGB.

**Tipografía**:
- Display: pixel/condensed/distorted (PP Mondwest, NaN Holo, VT323, Pixelify Sans, Departure Mono).
- Body: sans clean para legibilidad.

**Layout**:
- Scanlines, CRT curve sutil.
- VHS overlay opcional (con opt-out).
- Componentes con border thick + offset shadow style.

**Motion**:
- Glitch frame-perfect en hero.
- Marquees infinitos con scroll horizontal.
- Pixelated transitions.
- Low-fi loops.

**Librerías clave**:
- `framer-motion`, `gsap`, custom CSS shaders/filters, `magic-ui` (retro grid), webgl-noise textures.

**Sitios de referencia**:
- riot.com (lol campaigns), 84.paris, hover.com, replit (some campaigns), playstation.com (PS5).

**Trampas**:
- Nicho. No vender a clientes serios sin entender qué están comprando.
- Tipografías custom pesan; subset agresivo.

---

## 9 · Maximalist Layered

**Cuándo usar**: news/media, magazines digitales, comunidades, plataformas con mucho contenido simultáneo, marcas con personalidad densa, music labels.

**Mood adjectives**: denso, vivo, simultáneo, collage, abundante.

**Paleta orientativa**:
- Múltiples colores coexistiendo: 4-5 fuertes con sistema.
- Backgrounds con patterns y textures.
- Gradients combinados.

**Tipografía**:
- Mix de 2-3 familias con propósito distinto (display + body + accent decorativo).
- Tamaños variados en una misma sección.

**Layout**:
- Capas, overlaps, collage feel.
- Cards superpuestas, rotaciones leves.
- Imágenes con cinta de marquee, tags, badges.

**Motion**:
- Masivo: muchas cosas se mueven a la vez pero ordenadas.
- Marquees, parallax múltiples.
- Lottie y video loops cortos.

**Librerías clave**:
- `framer-motion`, `gsap`, `magic-ui` (marquee, animated grid), `aceternity-ui` (multi-layer animations), `lottie-react`.

**Sitios de referencia**:
- pitchfork.com, complex.com, dazeddigital.com, thecreativeindependent.com, kanyetothe (older sites).

**Trampas**:
- Performance: capa sobre capa quema. Budgets estrictos.
- Sin design system fuerte, parece desordenado en lugar de denso intencional.

---

## 10 · Minimal Refined (la excepción justificada)

**Cuándo usar SOLO si**:
- Industria conservadora donde minimal = profesional (legal, contable, médico tradicional, banking institucional, gobierno).
- Cliente lo solicita explícitamente por escrito.
- Todos los competidores benchmark son minimalistas y diferenciarse no agrega valor (raro pero pasa).

**Mood adjectives**: refinado, contenido, profesional, atemporal, restraint.

**Paleta orientativa**:
- Tonos muy suaves: `oklch(99% 0 0)`, `oklch(15% 0 0)`, un solo acento sobrio.
- Sin gradients.
- Sombras ínfimas.

**Tipografía**:
- 1 sola familia (Inter, Söhne, Söhne Schmal).
- Pocos weights (regular + medium).
- Escalas conservadoras.

**Layout**:
- Mucho whitespace.
- Grids ortogonales.
- Sistema 8px estricto.

**Motion**:
- Casi inexistente. Fade subtil, máximo.

**Librerías**:
- shadcn primitives, lucide-react, framer-motion solo para fades.

**Sitios de referencia**:
- stripe.com (algunas secciones), apollo.io, 37signals.com.

**Trampas**:
- Si elegís este estilo sin la justificación de arriba, estás dejando dinero en la mesa.
- En manos de un LLM, este estilo es donde más cae el sitio en lo "olvidable".

---

## Cómo elegir entre dos estilos cercanos

| Decisión           | Pregunta                                                                              |
|--------------------|----------------------------------------------------------------------------------------|
| Editorial vs Brutalist | ¿La marca es sofisticada o desafiante? Editorial = sofisticación. Brutalist = ruptura. |
| Glassmorphic vs Minimal Refined | ¿Premium con efecto wow o premium reservado? Glass = wow. Minimal = reservado. |
| Kinetic vs Dark Tech | ¿La narrativa principal es visión/futuro o producto/precisión? Kinetic = visión. Dark Tech = precisión. |
| Neo-Vivid vs Organic Warm | ¿La energía es digital-juvenil o terrenal-cálida? Neo-Vivid = digital. Organic = terrenal. |

---

*Cuando dudás entre dos estilos, elegí el más impactante de los dos y registrá la alternativa como D-NN en CONTEXT.md por si el cliente pivotea.*
