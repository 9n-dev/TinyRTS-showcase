# Web de TinyRTS con mundo vivo: plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rehacer la web de TinyRTS como app React + Vite con la interfaz Tiny Swords y la aldea viva del portfolio de fondo.

**Architecture:** Se copian del portfolio (`../portofolioWeb`) el motor del mundo, los componentes nine-slice, los estilos y los assets. El contenido sale de `tools/build_site.py` y pasa a `src/content/{en,es}.ts`. La lógica de `site.js` (modal, lightbox, clips, contadores, explorador de mapas) se porta a componentes React, uno por fichero.

**Tech Stack:** React 19, Vite 6, TypeScript 5.8, Playwright, @fontsource/pixelify-sans. Mismas versiones que `../portofolioWeb/package.json`.

**Spec:** `docs/superpowers/specs/2026-09-21-web-mundo-vivo-design.md`

## Global Constraints

- Origen de todo lo copiado: `/home/dev9/Documentos/portfolioRepos/portofolioWeb` (abreviado `$P`). No se modifica ese repo.
- Ids de sección, en orden: `home`, `game`, `features`, `maps`, `gallery`, `built`, `credits`. Pie: `<footer>`.
- Cada sección es `<section id class="section …">` con hijos directos `.section-heading` y `.pixel-panel` (o `.home-content` en la portada): `WorldCanvas` mide exactamente esos selectores.
- Sin dependencias nuevas respecto al portfolio. Sin enlaces a `github.com/9n-dev/TinyRTS-showcase` ni a Releases.
- Rutas de medios: `/media/…` y `/data/maps/…` (en `public/`). `vite.config.ts` con `base: '/'`.
- Textos visibles solo en `src/content/`. Código y comentarios en inglés, como el portfolio.
- Commits en español, en la rama `web-mundo-vivo`, con la línea `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.
- Tests: `npx playwright test` (puerto 5183). Chromium: si falta, `npx playwright install chromium`.

## Estructura de ficheros

```
index.html                     entrada de Vite (meta, og, #root)
package.json, tsconfig.json, vite.config.ts, playwright.config.ts
public/assets/                 copiado de $P/public/assets
public/media/, public/data/    movidos desde media/ y data/
src/main.tsx, src/App.tsx, src/i18n.tsx
src/content/en.ts, es.ts       tipo Content + textos
src/components/                NineSliceSurface, PixelUI, Navigation, Footer (copiados y adaptados)
                               Clip, Counter, TrailerModal, Lightbox, MapExplorer (nuevos)
src/sections/                  Home, Game, Features, Maps, Gallery, Built, Credits
src/styles/                    global.css (adaptado), ui.css, home.css (copiados), site.css (nuevo: lo propio de esta web)
src/world/                     copiado; solo cambian las claves de scenes.ts
tests/site.spec.ts, tests/world.spec.ts
```

---

### Task 1: Andamiaje, mundo y portada

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `playwright.config.ts`, `index.html` (reemplaza el actual), `src/main.tsx`, `src/App.tsx`, `src/i18n.tsx`, `src/vite-env.d.ts`, `src/content/en.ts`, `src/content/es.ts`, `src/sections/Home.tsx`, `src/components/*` (4 copiados), `src/styles/*`, `src/world/*`, `public/assets/*`
- Move: `media/` → `public/media/`, `data/` → `public/data/` (`git mv`)
- Delete: `es.html`, `site.css`, `site.js`, `tools/build_site.py`, `.nojekyll`
- Modify: `.gitignore` (añadir `node_modules/ dist/ *.tsbuildinfo test-results/ playwright-report/`)
- Test: `tests/world.spec.ts`, `tests/site.spec.ts`

**Interfaces:**
- Produces: `useContent(): { lang: 'en'|'es'; setLang(l): void; t: Content }` en `src/i18n.tsx`; `type Content` exportado desde `src/content/en.ts`; `PixelPanel`, `PixelButton`, `SectionTitle` de `src/components/PixelUI.tsx`; `SECTIONS = ['home','game','features','maps','gallery','built','credits'] as const` exportado desde `src/content/en.ts`.
- `PixelButton` acepta además `onClick` (ya lo hace: extiende `AnchorHTMLAttributes`).

- [ ] **Step 1: copiar y mover**

```bash
P=/home/dev9/Documentos/portfolioRepos/portofolioWeb
git mv media public/media && git mv data public/data   # crear public/ antes
git rm -q es.html site.css site.js tools/build_site.py .nojekyll
cp -r $P/public/assets public/
mkdir -p src/components src/sections src/content tests
cp -r $P/src/world $P/src/styles src/ && rm src/world/WorldCanvas.tsx.bak 2>/dev/null
cp $P/src/components/{NineSliceSurface,PixelUI,Navigation,Footer}.tsx src/components/
cp $P/src/{main.tsx,i18n.tsx,vite-env.d.ts} src/
cp $P/{tsconfig.json,playwright.config.ts} .
```

Antes de borrar `tools/build_site.py`, volcar su diccionario a JSON para el Task 2:
`python3 - <<'EOF'` que hace `exec` del fichero hasta la línea `def page` y escribe `S` y `CAMPS` en `$SCRATCH/strings.json`.

- [ ] **Step 2: `package.json`** con nombre `tinyrts-web`, `private: true`, `type: module`, los scripts `dev`, `build`, `preview`, `test:e2e` y exactamente las dependencias del portfolio. `vite.config.ts`: `export default defineConfig({ plugins: [react()] })`. `npm install`.

- [ ] **Step 3: adaptar lo copiado**
  - `src/world/scenes.ts`: `SceneId = 'home' | 'game' | 'maps' | 'gallery' | 'built' | 'shore'`; renombrar las claves `about→game`, `projects→maps`, `skills→gallery`, `contact→built`. Nada más.
  - `src/i18n.tsx`: `initialLang()` mira primero `new URLSearchParams(location.search).get('lang')`; `document.title = 'TinyRTS'`; quitar el import de `siteConfig`.
  - `Navigation.tsx`: `SECTIONS` en lugar de `siteConfig.sections`, marca `TinyRTS`. `Footer.tsx`: `t.footer.rights`, `t.footer.attribution`, `t.footer.top`; sin `siteConfig`.
  - `global.css`: los selectores `.about, .projects, .skills, .contact` pasan a `.game, .maps, .gallery, .built` (margen de franja) y `.about` → `.game` en la regla de `calc(392px + …)`. `.features, .credits` reciben `max-width: 1040px; margin: 96px auto 0; padding: 56px 40px 72px` (y `48px`/`16px` en móvil). Borrar las reglas de proyectos, skills, contacto y about que ya no se usan.
  - `index.html`: como el del portfolio, con `<title>TinyRTS</title>`, la descripción inglesa, `og:title`, `og:description`, `og:image` = `/media/trailer-poster.jpg`, `og:type`, icono `/assets/ui/Icon_05.png`.

- [ ] **Step 4: contenido mínimo y portada.** `en.ts`/`es.ts` con `skip`, `description`, `nav` (`main`, `language`, y una etiqueta por id de `SECTIONS`), `hero` (`tagline`, `watch`, `explore`), `footer`. `Home.tsx`: pergamino `scroll` con `<h1>TinyRTS</h1>`, lema y dos `PixelButton` (`#trailer` con `onClick` que llega en el Task 4; `#maps`). `App.tsx` como el del portfolio con `<Home />` y secciones vacías de relleno hasta el Task 3.

- [ ] **Step 5: tests.** `tests/world.spec.ts` copiado con el `layout` adaptado:

```ts
const layout = (h: number) => ['home', 'game', 'features', 'maps', 'gallery', 'built', 'credits', 'footer'].map((id, i) =>
  ({ id, rects: [{ x: 440, y: i * h + (i ? 448 : 150), w: 1040, h: h - (i ? 448 : 150) }] }));
// …
const world = compose(layout(h), width, 8 * h + 400);
expect(world.placed.map(s => s.id)).toEqual(['home', 'game', 'maps', 'gallery', 'built', 'shore']);
```

`tests/site.spec.ts`, primer test:

```ts
import { test, expect } from '@playwright/test';
test('the world paints behind the page', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/?lang=en');
  await expect(page.locator('h1')).toHaveText('TinyRTS');
  await page.waitForFunction(() => (window as any).__world?.entities.length > 5);
  expect(errors).toEqual([]);
});
```

- [ ] **Step 6:** `npx tsc -b && npx playwright test` → todo verde. Commit «Proyecto React + Vite con el mundo vivo y la portada».

### Task 2: Contenido completo e idiomas

**Files:** Modify `src/content/en.ts`, `src/content/es.ts`. Test: `tests/site.spec.ts`.

**Interfaces — Produces** (`Content`, además de lo del Task 1):

```ts
game: { title: string; paragraphs: string[]; clips: { id: string; alt: string; caption: string }[] };
features: { title: string; list: { head: string; body: string }[] };
maps: { title: string; intro: string; list: { id: MapId; name: string; desc: string }[]; legend: { color: string; name: string }[]; text: MapText };
gallery: { title: string; shots: { id: string; alt: string; caption: string }[] };
built: { title: string; before: string[]; facts: { key: string; value: string }[]; after: string[] };   // value: «About {16000} lines…»
credits: { title: string; status: string; list: { label: string; text: string; link?: { href: string; text: string } }[] };
ui: { close: string; prev: string; next: string; trailerTitle: string; mapLabel: string };
```

`MapId = 'valley' | 'crossroads' | 'cuatro-vientos'`; `MapText` = el objeto `text` de `build_site.py` más `camps`.

- [ ] **Step 1:** generar ambos ficheros desde `$SCRATCH/strings.json`, pasando `<b data-count="N">0</b>` a `{N}`.
- [ ] **Step 2:** cambios de texto del spec §4: `built_p4` («this site is the public presentation» / «esta web es la presentación pública»); créditos de arte sin «not redistributed» y con «the interface and the living background of this site are made from the same packs» / equivalente; fuente Pixelify Sans, de Stefie Justprince, SIL OFL. Sin `release`, `repo`, `footer_link`, `trailer_note`.
- [ ] **Step 3: tests**

```ts
test('language: the switch, the URL and the document', async ({ page }) => {
  await page.goto('/?lang=es');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.getByRole('link', { name: 'Ver el tráiler' })).toBeVisible();
  await page.getByRole('button', { name: 'EN' }).click();
  await expect(page.getByRole('link', { name: 'Watch the trailer' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});
test('no links to the private repository', async ({ page }) => {
  await page.goto('/?lang=en');
  expect(await page.locator('a[href*="github.com/9n-dev"]').count()).toBe(0);
});
```

- [ ] **Step 4:** verde, commit «Textos en español e inglés como contenido tipado».

### Task 3: Secciones de texto, clips y contadores

**Files:** Create `src/sections/{Game,Features,Built,Credits}.tsx`, `src/components/{Clip,Counter}.tsx`, `src/styles/site.css`. Modify `src/App.tsx`, `src/main.tsx` (importar `site.css`).

**Interfaces — Produces:** `<Clip id alt />` (vídeo `/media/clip-{id}.webm|mp4`, 960×540, muted/loop/playsInline, reproduce con `intersectionRatio >= 0.4`, nada con reduced motion); `<Counter to={number} />` (cúbica de 900 ms al verse al 60 %, `Intl.NumberFormat` del idioma activo); `renderFact(value: string): ReactNode[]` en `Built.tsx` que parte por `/\{(\d+)\}/`.

- [ ] Cada sección: `SectionTitle` + `PixelPanel skin="wood"` con `PixelPanel` de papel dentro. `Game`: párrafos y rejilla 2×2 de `figure.frame` con `Clip`. `Features`: `<ul class="feature-list">`. `Built`: párrafos, `<table class="facts">`, párrafos. `Credits`: párrafo de estado y lista.
- [ ] Test:

```ts
test('menu anchors exist and the counters reach their value', async ({ page }) => {
  await page.goto('/?lang=en');
  for (const id of ['game', 'features', 'maps', 'gallery', 'built', 'credits']) await expect(page.locator(`section#${id}`)).toHaveCount(1);
  await page.locator('#built table').scrollIntoViewIfNeeded();
  await expect(page.locator('#built table')).toContainText('16,000');
  expect(await page.locator('video.clip').count()).toBe(4);
});
```

- [ ] Verde, commit «Secciones El juego, Características, Cómo está hecho y Créditos».

### Task 4: Tráiler, galería y lightbox

**Files:** Create `src/components/{TrailerModal,Lightbox}.tsx`, `src/sections/Gallery.tsx`. Modify `src/App.tsx`, `src/sections/Home.tsx`, `src/styles/site.css`.

**Interfaces:** `App` guarda `const [trailer, setTrailer] = useState(false)`; `<Home onTrailer={() => setTrailer(true)} />`; `<TrailerModal open onClose />` no renderiza nada cerrado (así el vídeo se destruye), `role="dialog" aria-modal`, Esc y clic fuera cierran, foco al botón de cerrar. `<Lightbox shots index onIndex(i | null) />` con flechas, Esc y contador `n / total`; `Gallery` guarda el índice. Ambos ponen `modal-open` en `body` mientras están abiertos.

- [ ] Test:

```ts
test('trailer modal opens with the language video and closes with Escape', async ({ page }) => {
  await page.goto('/?lang=es');
  await page.getByRole('link', { name: 'Ver el tráiler' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.locator('source').first()).toHaveAttribute('src', /trailer-es-720p/);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
});
test('lightbox walks the gallery', async ({ page }) => {
  await page.goto('/?lang=en');
  await page.locator('#gallery a.shot').first().click();
  await expect(page.getByRole('dialog')).toContainText('1 / 10');
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('dialog')).toContainText('2 / 10');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});
```

- [ ] Verde, commit «Tráiler en modal, galería y lightbox».

### Task 5: Explorador de mapas

**Files:** Create `src/components/MapExplorer.tsx`, `src/sections/Maps.tsx`. Modify `src/App.tsx`, `src/styles/site.css`.

**Interfaces:** `drawMap(canvas, map, width, text): Marker[]` función pura fuera del componente, con el cuerpo de `draw()` de `site.js` líneas 133–207 sin cambios de lógica. El componente guarda `id`, carga `/data/maps/{id}.json` con caché en un `Map` de módulo, redibuja con `ResizeObserver` del contenedor y al cambiar de idioma, y pinta el tooltip desde estado React (sin `innerHTML`).

- [ ] Test:

```ts
test('map explorer draws and switches maps', async ({ page }) => {
  await page.goto('/?lang=en');
  await page.locator('#maps').scrollIntoViewIfNeeded();
  await expect(page.locator('.map-info')).toContainText('96×64');
  const painted = () => page.locator('#maps canvas').evaluate((c: HTMLCanvasElement) =>
    new Set(c.getContext('2d')!.getImageData(0, 0, c.width, c.height).data.filter((_, i) => i % 4 === 1)).size);
  expect(await painted()).toBeGreaterThan(3);
  await page.getByRole('tab', { name: 'The Crossroads' }).click();
  await expect(page.locator('.map-info')).toContainText('160×160');
});
```

- [ ] Verde, commit «Explorador de mapas como componente».

### Task 6: Pulido visual, móvil, README y entrega

**Files:** Modify `src/styles/site.css`, `README.md`, `README.es.md`. Create `vercel.json` solo si hace falta (no debería: Vercel detecta Vite).

- [ ] Test de móvil y de consola:

```ts
test('phone: no horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/?lang=es');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
```

- [ ] Capturas a 1440×900 y 390×844 de cada sección con Playwright a `$SCRATCH`; mirarlas y corregir solapes del mundo con los paneles, márgenes de franja y legibilidad.
- [ ] README: rutas `media/` → `public/media/`; quitar los enlaces a Pages y a Releases; una sección «Desarrollo» con `npm install`, `npm run dev`, `npm run build`, `npm run test:e2e`.
- [ ] `npm run build` limpio y `npx playwright test` verde. Commit «Pulido, móvil y README». Entregar al autor: conectar Vercel; con la URL, actualizar `og:image`/`og:url` y los enlaces de los dos portfolios (con su confirmación).
