/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        artaOrange: '#FF7F50',       // Énergie, Espérance Joviale
        artaTurquoise: '#40E0D0',     // Sanctuarisation, Fluidité
        darkSanctuary: '#0B0F19',     // Fond d'isolation locale
      },
      backgroundImage: {
        'fractal-bg': "url('./assets/images/fractal-bg.jpg')",
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};
