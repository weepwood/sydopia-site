/**
 * Static completeness checks (no runtime/browser dependency).
 * Does not replace browser interaction and visual-regression testing.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const js = read('components/sydopia-ui.js');
const html = read('components/index.html');
const css = read('components/sydopia-ui.css');
const types = read('components/sydopia-ui.d.ts');

assert.match(js, /export function createProjectMarquee\(/);
assert.match(js, /export function createPaperTestimonials\(/);
assert.match(types, /declare function createProjectMarquee\(/);
assert.match(types, /declare function createPaperTestimonials\(/);
assert.match(css, /\.sui-project-root/);
assert.match(css, /\.sui-paper-root/);
assert.match(css, /prefers-reduced-motion/);
assert.match(html, /id="marquee-preview"/);
assert.match(html, /id="paper-preview"/);
assert.match(html, /src="\.\/sydopia-ui\.js"/, 'The demo must import the component module');

const moduleScript = [...html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)];
assert.equal(moduleScript.length, 1, 'Expected one demo entry module');
const sourceWithoutImport = moduleScript[0][1].replace(/^\s*import\s+.*?;\s*$/m, '');
assert.doesNotThrow(() => new Function(sourceWithoutImport), 'Demo JavaScript must parse');

const assets = [...html.matchAll(/asset\('([^']+)'\)/g)].map(match => match[1]);
assert.ok(assets.length > 3, 'Demo should include multiple real example assets');
for (const asset of assets) {
  assert.ok(!asset.includes('/') && !asset.includes('..'), 'Assets must be local file names');
  assert.ok(fs.existsSync(path.join(root, '_assets', asset)), 'Missing asset: ' + asset);
}

console.log('PASS: components, declarations, demo module, CSS and local image references.');
