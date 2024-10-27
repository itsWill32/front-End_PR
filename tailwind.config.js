/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        // Animación del borde
        'border-anim': {
          '0%': { borderColor: 'transparent', borderWidth: '2px 0 0 0' },
          '25%': { borderColor: 'white transparent transparent transparent', borderWidth: '2px 2px 0 0' },
          '50%': { borderColor: 'white white transparent transparent', borderWidth: '2px 2px 2px 0' },
          '100%': { borderColor: 'white', borderWidth: '2px' },
        },
        // Animación del degradado
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        'border-animate': 'border-anim 1s ease-in-out forwards',
        'gradient-x': 'gradient-x 3s ease infinite', // Reduce a 3 segundos para que sea más notorio
      },
      backgroundSize: {
        '200%': '200%', // Mantener el tamaño del fondo
      },
      // Colores del degradado
      colors: {
        'gradient-dark': '#0B0F14', // Color más oscuro
        'gradient-light': '#1E3545', // Color más claro
      },
    },
  },
  plugins: [],
};
