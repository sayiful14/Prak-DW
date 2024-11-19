/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html"],
  darkMode: 'class', //Menambahkan dark mode
  theme: {
    extend: {
      colors: {
        primary: '#8A2BE2',
        secondary: '#00FFFF',
      },
      fontFamily: {
        sans: ['roboto', 'sans-serif'],
      },  
    },
  },
  plugins: [],
}

