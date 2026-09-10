/**
 * Convierte las rutas absolutas (/_astro/..., /img/..., /servicios, ...)
 * del sitio compilado en rutas relativas (./ o ../ según la profundidad),
 * para que el sitio funcione aunque se suba dentro de una subcarpeta.
 * Se ejecuta automáticamente después de `astro build` (ver package.json).
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative, dirname, sep } from 'node:path';

const DIST = 'dist';

function archivos(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? archivos(p) : [p];
  });
}

function prefijo(archivo) {
  const niveles = relative(DIST, dirname(archivo)).split(sep).filter(Boolean).length;
  return niveles === 0 ? './' : '../'.repeat(niveles);
}

// Rutas que nunca deben tocarse: protocolo, protocolo-relativas, anclas, data:, mailto, tel
const ES_ABSOLUTA_RAIZ = (v) => v.startsWith('/') && !v.startsWith('//');

let html = 0, css = 0;
for (const archivo of archivos(DIST)) {
  const pre = prefijo(archivo);
  let contenido = readFileSync(archivo, 'utf8');
  const original = contenido;

  if (archivo.endsWith('.html')) {
    // href, src, action, content (og:image), poster
    contenido = contenido.replace(
      /\b(href|src|action|content|poster)=(["'])(\/[^"'\s]*)\2/g,
      (m, attr, q, v) => (ES_ABSOLUTA_RAIZ(v) ? `${attr}=${q}${pre}${v.slice(1)}${q}` : m),
    );
    // srcset: varias URLs separadas por coma
    contenido = contenido.replace(/\bsrcset=(["'])([^"']+)\1/g, (m, q, v) => {
      const nuevo = v
        .split(',')
        .map((s) => s.trim().replace(/^\/(?!\/)/, pre))
        .join(', ');
      return `srcset=${q}${nuevo}${q}`;
    });
    // url(/...) dentro de <style>
    contenido = contenido.replace(/url\((["']?)\/(?!\/)/g, `url($1${pre}`);
    if (contenido !== original) html++;
  } else if (archivo.endsWith('.css')) {
    contenido = contenido.replace(/url\((["']?)\/(?!\/)/g, `url($1${pre}`);
    if (contenido !== original) css++;
  }

  if (contenido !== original) writeFileSync(archivo, contenido);
}
console.log(`[rutas-relativas] ${html} HTML y ${css} CSS convertidos a rutas relativas.`);
