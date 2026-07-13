/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cafe: {
          ivory: '#F7F2EA',
          cream: '#EDE2D2',
          espresso: '#2A211B',
          cocoa: '#4A382D',
          olive: '#74745C',
          terracotta: '#A86445',
          gold: '#C3A36A',
          text: '#211B17',
        }
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        sans: ['Manrope', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
