/** @type {import('tailwindcss').Config} */
module.exports = {
  // Define qué archivos analizar para purgar las clases no usadas
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  // Activa el modo dark class (puede ser 'media' si prefieres)
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // Colores personalizados opcionales
        primary: {
          DEFAULT: '#3b82f6', // azul Tailwind 500
          dark: '#1e40af',    // azul 800
          light: '#93c5fd',   // azul 300
        },
        secondary: {
          DEFAULT: '#f59e0b', // amarillo Tailwind 500
        },
      },

      fontFamily: {
        // Ejemplo: usa Inter si está instalado
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },

      spacing: {
        // Ejemplo de espaciado extra
        '128': '32rem',
        '144': '36rem',
      },
    },
  },

  plugins: [
    // Plugins opcionales que mejoran la experiencia
    require('@tailwindcss/forms'),   // Mejora estilos de formularios
    require('@tailwindcss/typography'), // Para textos ricos
    require('@tailwindcss/aspect-ratio'), // Para imágenes/videos responsivos
  ],
};
