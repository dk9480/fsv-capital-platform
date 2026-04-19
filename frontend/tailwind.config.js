/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fsv': {
          'navy': '#0A1929',
          'gold': '#FFB74D',
          'teal': '#008080',
          'dark': '#0F172A',
        }
      }
    },
  },
  plugins: [],
}