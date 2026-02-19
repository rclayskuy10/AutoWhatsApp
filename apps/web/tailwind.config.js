/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'wa-green': '#25D366',
        'wa-dark': '#128C7E',
        'wa-light': '#DCF8C6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      ringColor: {
        'wa-green': '#25D366',
      },
      borderColor: {
        'wa-green': '#25D366',
      },
    },
  },
  plugins: [],
}
