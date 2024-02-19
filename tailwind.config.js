/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        lato:["Lato","sans-serif"],
      },
    },
  },
  variant:{
    extend:{},
  },
  plugins: [],
}

