# Web de TinyRTS con mundo vivo: diseño

Fecha: 2026-09-21. Estado: aprobado.

## Objetivo

Rehacer la web de presentación de TinyRTS con el estilo del portfolio (`../portofolioWeb`, repo TinyPortfolio): interfaz
del pack Tiny Swords (tablones, pergaminos, cintas, botones) sobre una aldea viva pintada en un `<canvas>`. El repo
pasa a ser privado y la web se despliega en Vercel, porque GitHub Pages no publica repos privados en cuentas Free.

## Decisiones tomadas con el autor

| Tema | Decisión |
| --- | --- |
| Visibilidad | Repo privado (hecho el 2026-09-21). Web en Vercel. |
| Estilo | Mundo vivo completo, como el portfolio. |
| Mundo | La misma aldea pacífica del portfolio. Sin campamentos, enemigos ni combate. |
| Técnica | React 19 + Vite + TypeScript, mismas versiones que el portfolio. Se reutilizan sus componentes. |
| Idiomas | Una sola página con selector ES/EN. Desaparece `es.html`. |

## 1. Estructura

Se copia de `../portofolioWeb` sin cambios de fondo: `src/world/*`, `src/components/{NineSliceSurface,PixelUI,Navigation,Footer}.tsx`,
`src/styles/*`, `src/i18n.tsx`, `public/assets/*`, `tsconfig.json`, `vite.config.ts` y `playwright.config.ts`.
No se trae `scripts/prepare-assets.py` ni el zip del pack: los sprites ya están recortados y `sprites.generated.ts` se
copia tal cual. Si algún día hacen falta sprites nuevos, se generan en el portfolio y se copian.

Se eliminan `tools/build_site.py`, `es.html`, `site.css` y `site.js`. `index.html` pasa a ser la entrada de Vite.
`media/` y `data/` se mueven a `public/`; los README actualizan sus rutas de imagen.

`vite.config.ts` fija `base: '/'`: ya no hay despliegue en una subruta de GitHub Pages.

## 2. Página y escenas

Orden: Portada → El juego → Características → Mapas → Capturas → Cómo está hecho → Estado y créditos → pie y costa.
Ids de sección: `home`, `game`, `features`, `maps`, `gallery`, `built`, `credits`.

`SceneId` se renombra a los ids de esta web: la franja `about` del portfolio pasa a `game` (casas y estanque),
`projects` a `maps` (mina y talleres), `skills` a `gallery` (cuartel y arqueros) y `contact` a `built` (monasterio
y lago). `home` y `shore` no cambian. `features` y `credits` no tienen franja: su hueco lo llena el bosque de relleno.
El CSS mantiene el margen de 5 tiles sobre las secciones con franja y uno corto sobre las que no la tienen.

Portada: pergamino a la izquierda con la cinta «TinyRTS», el lema, y los botones «Ver el tráiler» y «Explorar los
mapas». El tráiler ya no es fondo de la portada: se abre en el modal.

Idioma inicial: `?lang=es|en` en la URL, después `localStorage`, después el idioma del navegador. El título del
documento es «TinyRTS» y la descripción cambia con el idioma.

## 3. Componentes nuevos

Portes directos de `site.js`, cada uno en su fichero de `src/components/`:

- `TrailerModal`: diálogo con el vídeo del idioma activo (`trailer-{lang}-720p`), cierra con Esc, con el botón y
  pulsando fuera. El vídeo se crea al abrir y se destruye al cerrar.
- `Lightbox`: galería con anterior/siguiente, flechas del teclado y contador.
- `MapExplorer`: pestañas de los tres mapas, dibujo en canvas a partir de `public/data/maps/*.json`, tooltip y
  leyenda. La lógica de dibujo y de tooltip se conserva.
- `Clip`: vídeo en bucle sin sonido que solo se reproduce mientras está visible (IntersectionObserver).
- `Counter`: número que sube hasta su valor la primera vez que se ve; con `prefers-reduced-motion` muestra el valor.

Cada sección es un tablón de madera (`wood`) con pergaminos (`paper`) dentro y su cinta de título, como en el
portfolio. Clips y capturas van enmarcados dentro del pergamino.

## 4. Contenido

Los textos salen del diccionario `S` y de `CAMPS` de `tools/build_site.py` y pasan a `src/content/en.ts` y `es.ts`
con un tipo `Content` común. Cambios de texto:

- Fuera los enlaces al repositorio y a Releases: el repo es privado y darían 404.
- «The source repository is private; this site and its repository are the public presentation» pasa a decir que
  esta web es la presentación pública.
- Créditos: la web ahora sirve sprites recortados de Tiny Swords, así que se retira «The packs are not
  redistributed here» y se dice que el arte de la interfaz y del fondo es del pack, usado bajo su licencia.
  La fuente pasa a ser Pixelify Sans (SIL OFL); se retira Caladea.
- `og:image` apunta a la URL de Vercel cuando exista; hasta entonces, ruta relativa al sitio.

## 5. Tests

Playwright, como el portfolio. `tests/site.spec.ts`: la página carga en ambos idiomas y el selector cambia los
textos; `?lang=es` manda; las anclas del menú existen; el modal del tráiler abre y cierra; el explorador de mapas
pinta píxeles y cambia de mapa; el lightbox navega; a 390 px no hay scroll horizontal; no hay errores de consola.
`tests/world.spec.ts` adaptado del portfolio: el mundo se compone, tiene entidades y una escena por franja.

## 6. Despliegue

Rama `web-mundo-vivo`. El autor conecta el repo privado en Vercel (detecta Vite: `npm run build`, salida `dist`).
Con la URL definitiva se actualizan `og:image`/`og:url` aquí y los enlaces en `portofolioWeb/src/content/{es,en}.ts`
(`url` nueva, sin `sourceUrl`) y `portfolioProfesional/src/content/proyectos/web-tinyrts.md`, en sus propios repos
y con confirmación del autor.

## Fuera de alcance

Campamentos, enemigos y combate en el mundo. Aligerar el historial de git de los vídeos. Dominio propio.
