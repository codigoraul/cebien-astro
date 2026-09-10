import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

/**
 * Colecciones de contenido.
 *
 * Hoy los datos vienen de archivos JSON locales. Cuando se conecte
 * WordPress headless basta con cambiar el `loader` por uno que consulte
 * la API de WordPress: el esquema y las plantillas no cambian.
 */

const servicios = defineCollection({
  loader: file('src/data/servicios.json'),
  schema: z.object({
    nombre: z.string(),
    categoria: z.string(),
    orden: z.number(),
    resumen: z.string(),
    descripcion: z.string(),
  }),
});

const equipo = defineCollection({
  loader: file('src/data/equipo.json'),
  schema: z.object({
    nombre: z.string(),
    cargo: z.string(),
    area: z.string(),
    orden: z.number(),
    foto: z.string().optional(),
  }),
});

export const collections = { servicios, equipo };
