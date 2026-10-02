# juanpablohomez.com

Sitio profesional de **Juan Pablo Hómez** — contabilidad, datos, tecnología y producto.

El Home está construido completo. La arquitectura está preparada para crecer hacia
páginas internas sin reestructurar nada.

---

## Stack

| Decisión | Por qué |
| --- | --- |
| **Next.js 16 · App Router · React 19 · TypeScript** | Renderizado estático, metadata y rutas de API en el mismo proyecto. |
| **CSS Modules + tokens propios** | Sin framework de utilidades: el sistema de diseño vive en `styles/tokens.css` y nada lo duplica. |
| **Sin librería de animación** | Todo el motion es CSS + `IntersectionObserver`. Una librería habría añadido peso sin resolver nada que el navegador no haga ya. |
| **`next/font`** | Fuentes auto-hospedadas y precargadas: sin petición externa y sin salto de layout. |

Dependencias de producción: `next`, `react`, `react-dom`. Nada más.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm start
npm run lint
npm run typecheck
```

---

## Las dos fotografías

**El sitio todavía no tiene las fotos.** Mientras falten, cada marco muestra un
placeholder neutro con la ruta exacta del archivo que espera — nunca una imagen rota.

Coloca los archivos en `public/images/` con estos nombres:

| Archivo | Uso | Encuadre |
| --- | --- | --- |
| `juan-pablo-homez-retrato.*` | Hero y Sobre mí | Vertical 4:5. Retrato profesional, fondo neutro. |
| `juan-pablo-homez-evento-fintech.*` | Conferencias | Horizontal 4:3. Foto del evento fintech. |

Extensiones aceptadas, en orden de preferencia: `.avif`, `.webp`, `.jpg`, `.jpeg`, `.png`.
El componente las detecta en el servidor y las sirve con `next/image`
(AVIF/WebP, `srcset` y lazy loading automáticos). El placeholder usa exactamente la
misma relación de aspecto, así que **no hay ningún salto de layout** cuando llegue la
foto real. Los textos alternativos y el punto focal se editan en `content/photos.ts`.

---

## Estructura

```
app/            layout, página, rutas de API, sitemap, robots, imagen OG
components/
  layout/       Header, Footer, Container, Section, Analytics
  sections/     una sección del Home por archivo (+ su .module.css)
  ui/           Button, Field, Metric, Tag, Reveal, Photo, Icon…
content/        TODO el texto y los datos — separados de la presentación
hooks/          useInView, useCountUp, useScrollProgress, useMediaQuery…
lib/            analytics, schema JSON-LD, validación de contacto
styles/         tokens.css · base.css · motion.css
```

`app/page.tsx` es solo una composición: no contiene ni una línea de layout ni de copy.
Para cambiar un texto, una métrica o un servicio se edita `content/`, nunca un componente.

---

## Sistema de diseño

Todo vive en `styles/tokens.css`. Ningún componente inventa un valor suelto.

**Superficies.** Una sección declara su contexto de color y los descendientes resuelven
solos sus variables: ningún componente necesita saber si está sobre fondo claro u oscuro.

```tsx
<Section surface="deep">   {/* --fg, --rule, --btn-bg, --mark… se redefinen aquí */}
```

Superficies disponibles: `paper` (off-white cálido), `sunken` (gris claro) y `deep`
(azul petróleo). El ritmo del Home alterna entre ellas a propósito — ninguna sección
consecutiva usa la misma composición.

**Tipografía.** Inter Tight para interfaz y titulares; Instrument Serif, en cursiva y
muy medida, como voz editorial. Escala fluida con `clamp()` entre 360 px y 1440 px.

---

## Formulario de contacto

Valida en cliente y **otra vez en el servidor** (`lib/contact.ts` es el contrato
compartido), tiene honeypot, límite de envíos por IP y los cuatro estados:
reposo, enviando, éxito y error.

Para que entregue mensajes configura **una** de estas dos opciones:

```bash
# A — reenviar como JSON a una automatización (Zapier, Make, n8n)
CONTACT_WEBHOOK_URL=

# B — enviar por correo con Resend
RESEND_API_KEY=
CONTACT_FROM_EMAIL=     # remitente verificado en Resend
CONTACT_TO_EMAIL=       # por defecto, el correo de content/site.ts
```

**Sin ninguna configurada el formulario no finge que envió nada:** responde que
todavía no está conectado y muestra el correo directo. Copia `.env.example` a
`.env.local` para empezar.

---

## Analítica

El sitio no incluye ningún tracker por defecto. Define `NEXT_PUBLIC_GTM_ID` (preferido)
o `NEXT_PUBLIC_GA_ID` y se carga después de la hidratación, sin tocar LCP ni INP.

Los nombres de evento están definidos en un único lugar, `lib/analytics.ts`, para que
la configuración de GA4/GTM y el código no se desincronicen:

`cta_hero` · `cta_servicio` · `servicio_seleccionado` · `cta_caso` · `cta_conferencias`
· `contacto_iniciado` · `contacto_enviado` · `contacto_error` · `click_linkedin`
· `click_email` · `nav_click` · `articulo_abierto`

---

## Accesibilidad

Verificado con navegador real, no solo con linters:

- HTML semántico, un solo `<h1>`, jerarquía de encabezados sin saltos.
- Skip link como primer elemento del orden de tabulación; foco siempre visible.
- Menú móvil: no existe en el DOM mientras está cerrado, cierra con `Escape` y
  devuelve el foco al botón. Objetivos táctiles de 44 px o más.
- Formulario con `label`, `aria-invalid`, `aria-describedby` y errores anunciados;
  el foco salta al primer campo con problema. El color nunca es la única señal.
- **Contraste AA verificado** para cada token de texto sobre cada superficie.
- `prefers-reduced-motion`: el movimiento no se acorta, se elimina — y el contenido
  deja de depender del observador, así que todo es visible desde la carga.
- Sin JavaScript (o sin `IntersectionObserver`) nada se oculta nunca.

---

## Performance

Medido sobre el build de producción, 1440 × 900:

| Métrica | Valor |
| --- | --- |
| CLS | **0** |
| FCP | ~220 ms |
| LCP | ~900 ms |

Las entradas sobre la línea de flotación usan una duración corta a propósito: un
elemento en `opacity: 0` no cuenta como pintado, así que una animación lenta en el
hero retrasa el LCP directamente (medimos 1460 ms antes de corregirlo).

---

## Lo que todavía no existe

Decisiones conscientes, no pendientes olvidados:

- **Artículos de Insights.** Los títulos se muestran pero **no son enlaces**: un enlace
  a una página inexistente cuesta confianza y posicionamiento. `content/articles.ts` ya
  tiene la forma que devolverá el CMS; publicar uno es cambiar `status` y añadir la ruta.
- **Testimonios.** No hay sección porque no hay testimonios reales. No se inventan.
- **Páginas internas** (`/servicios/[slug]`, `/proyectos/[slug]`, `/insights/[slug]`…).
  La capa de contenido ya incluye los `slug`; faltan solo las rutas.
- **`sitemap.xml`** lista únicamente la ruta que existe, a propósito.

Antes de publicar: ajusta `site.email` y `site.linkedin` en `content/site.ts` — son los
valores que usan el footer, el formulario y el JSON-LD.
