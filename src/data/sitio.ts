/**
 * Datos del centro. Único lugar donde se editan teléfonos, correo y dirección.
 * Cuando se conecte WordPress headless, este archivo se reemplaza por la
 * consulta a la API sin tocar las plantillas.
 */
export const sitio = {
  nombre: 'Centro de Salud y Bienestar Cebien',
  nombreCorto: 'Centro Cebien',
  descripcion:
    'Centro ambulatorio de salud mental en Concepción. Atención psiquiátrica, psicológica y de rehabilitación con profesionales certificados.',
  direccion: {
    calle: 'Cochrane 740, oficina 101',
    ciudad: 'Concepción',
    region: 'Región del Biobío',
    pais: 'Chile',
    mapa: 'https://www.google.com/maps/search/?api=1&query=Cochrane+740+Concepci%C3%B3n+Chile',
    mapaEmbed:
      'https://www.google.com/maps?q=Cochrane+740,+Concepci%C3%B3n,+Chile&output=embed',
  },
  telefono: {
    fijo: '41 2196700',
    fijoLink: '+56412196700',
    celular: '+56 9 7608 1444',
    celularLink: '+56976081444',
    whatsapp: '56976081444',
  },
  email: 'secretaria.cebien@gmail.com',
  convenios: {
    titulo: 'Convenios y formas de atención',
    texto:
      'Atendemos las prestaciones de salud mental garantizadas por la Ley GES a través de RedGesam, red nacional que mantiene convenio con todas las isapres abiertas del sistema. También atendemos de forma particular, con reembolso Fonasa e Isapre.',
    red: {
      nombre: 'RedGesam',
      logo: '/img/convenios/redgesam.webp',
      url: 'https://www.redgesam.cl',
    },
    // Isapres con convenio a través de RedGesam. Logos en public/img/convenios (400x160, fondo transparente).
    isapres: [
      { nombre: 'Banmédica', logo: '/img/convenios/banmedica.webp' },
      { nombre: 'Colmena', logo: '/img/convenios/colmena.webp' },
      { nombre: 'CruzBlanca', logo: '/img/convenios/cruzblanca.webp' },
      { nombre: 'Consalud', logo: '/img/convenios/consalud.webp' },
      { nombre: 'Isapre Fundación BancoEstado', logo: '/img/convenios/fundacion-bancoestado.webp' },
      { nombre: 'Isalud, Isapre de Codelco', logo: '/img/convenios/isalud.webp' },
      { nombre: 'Vida Tres', logo: '/img/convenios/vidatres.webp' },
      { nombre: 'Nueva Masvida', logo: '/img/convenios/nueva-masvida.webp' },
    ],
  },
} as const;

export const navegacion = [
  { href: '/', texto: 'Inicio' },
  { href: '/nosotros', texto: 'Nosotros' },
  { href: '/servicios', texto: 'Servicios' },
  { href: '/equipo', texto: 'Equipo' },
  { href: '/contacto', texto: 'Contacto' },
];
