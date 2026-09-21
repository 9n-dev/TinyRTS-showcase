import { test, expect } from '@playwright/test';

test('the world paints behind the page, without errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/?lang=en');
  await expect(page.locator('h1')).toHaveText('TinyRTS');
  await page.waitForFunction(() => (window as any).__world?.entities.length > 5);
  expect(await page.evaluate(() => (window as any).__world.world.placed.map((scene: { id: string }) => scene.id)))
    .toEqual(['home', 'game', 'maps', 'gallery', 'built', 'shore']);
  expect(errors).toEqual([]);
});

test('language: the URL, the switch and the document', async ({ page }) => {
  await page.goto('/?lang=es');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.getByRole('link', { name: 'Ver el tráiler' })).toBeVisible();
  await page.getByRole('button', { name: 'EN' }).click();
  await expect(page.getByRole('link', { name: 'Watch the trailer' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('no links to the private repository', async ({ page }) => {
  await page.goto('/?lang=en');
  expect(await page.locator('a[href*="github.com"]').count()).toBe(0);
});

test('menu anchors exist, clips are there and the counters reach their value', async ({ page }) => {
  await page.goto('/?lang=en');
  for (const id of ['home', 'game', 'features', 'maps', 'gallery', 'built', 'credits']) await expect(page.locator(`section#${id}`)).toHaveCount(1);
  for (const link of await page.locator('.nav-links a').all()) await expect(page.locator(`section${await link.getAttribute('href')}`)).toHaveCount(1);
  expect(await page.locator('video.clip').count()).toBe(4);
  await page.locator('#built table').scrollIntoViewIfNeeded();
  await expect(page.locator('#built table')).toContainText('16,000');
});

test('trailer modal opens with the video of the language and closes with Escape', async ({ page }) => {
  await page.goto('/?lang=es');
  await page.getByRole('link', { name: 'Ver el tráiler' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.locator('source').first()).toHaveAttribute('src', /trailer-es-720p/);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Ver el tráiler' })).toBeFocused();
});

test('lightbox walks the gallery', async ({ page }) => {
  await page.goto('/?lang=en');
  await page.locator('#gallery a.shot').first().click();
  await expect(page.getByRole('dialog')).toContainText('1 / 10');
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('dialog')).toContainText('2 / 10');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('dialog')).toContainText('10 / 10');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('map explorer draws and switches maps', async ({ page }) => {
  await page.goto('/?lang=en');
  await page.locator('#maps').scrollIntoViewIfNeeded();
  await expect(page.locator('.map-info')).toContainText('96×64');
  const greens = () => page.locator('#maps canvas').evaluate((canvas: HTMLCanvasElement) =>
    new Set(canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height).data.filter((_, i) => i % 4 === 1)).size);
  expect(await greens()).toBeGreaterThan(3);
  await page.getByRole('tab', { name: 'The Crossroads' }).click();
  await expect(page.locator('.map-info')).toContainText('160×160');
  await page.locator('#maps canvas').hover({ position: { x: 40, y: 40 } });
  await expect(page.locator('.map-tip')).toBeVisible();
});

for (const width of [390, 1440]) test(`no horizontal scroll at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 844 });
  await page.goto('/?lang=es');
  await page.waitForFunction(() => (window as any).__world);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
