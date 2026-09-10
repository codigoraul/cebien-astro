# cebien.cl — sitio en Astro

Sitio informativo del Centro de Salud y Bienestar Cebien (Concepción).
Astro 5, estático, sin framework de UI. Pensado para publicarse en hosting cPanel.

## Comandos

```bash
npm install       # instalar dependencias
npm run dev       # servidor local en http://localhost:4321
npm run build     # genera /dist listo para subir
npm run preview   # revisa /dist antes de publicar
```

## Estructura

```
src/
  data/
    sitio.ts          → teléfonos, correo, dirección, horarios, convenios
    servicios.json    → catálogo de prestaciones
    equipo.json       → profesionales y personal
  content.config.ts   → esquema de las colecciones (servicios y equipo)
  layouts/Base.astro  → head, SEO, schema.org, header y footer
  components/         → header, footer, tarjetas, llamado a la acción
  pages/              → una página por sección + /servicios/[slug]
  styles/global.css   → tokens de color y estilos base
public/
  img/                → logotipos optimizados (webp)
  enviar.php          → procesa el formulario de contacto (requiere PHP)
  .htaccess           → compresión, caché y cabeceras para Apache/cPanel
```

## Cómo editar el contenido

Todo el contenido editable está en `src/data/`. No hace falta tocar las plantillas.

- **Datos de contacto y horarios**: `src/data/sitio.ts`
- **Servicios**: `src/data/servicios.json`. Cada entrada necesita `id` (que define la
  URL), `nombre`, `categoria`, `orden`, `resumen` y `descripcion`. Los párrafos de la
  descripción se separan con `\n\n`.
- **Equipo**: `src/data/equipo.json`. Para agregar la foto de un profesional, deje el
  archivo en `public/img/equipo/` y añada el campo `"foto": "/img/equipo/nombre.webp"`.
  Sin ese campo se muestran las iniciales sobre un círculo de color.

## Pendientes antes de publicar

- [ ] Confirmar con el cliente el listado definitivo de servicios (el actual es una
      propuesta basada en las especialidades del staff).
- [ ] Confirmar los horarios de atención — hoy hay valores provisorios en `sitio.ts`.
- [ ] Fotografías del equipo y del centro.
- [ ] Verificar el orden de nombres y apellidos del equipo con el cliente.
- [ ] Crear la casilla `no-responder@cebien.cl` en cPanel y ajustar `$REMITENTE`
      en `public/enviar.php` (Gmail rechaza correos que dicen venir de gmail.com
      pero salen del servidor del hosting).
- [ ] Descomentar en `.htaccess` la redirección a https y sin www.

## Publicación

`npm run build` genera `dist/`. Suba **el contenido** de `dist/` a `public_html`
del hosting. `enviar.php` y `.htaccess` viajan dentro de `dist/` porque están en
`public/`.

## Paso siguiente: WordPress headless

Los servicios y el equipo ya están modelados como colecciones de contenido en
`src/content.config.ts`. Para pasar a WordPress headless basta con reemplazar el
`loader: file(...)` por un loader que consulte la API de WordPress y mantener los
mismos campos del esquema. Las páginas y componentes no cambian.
