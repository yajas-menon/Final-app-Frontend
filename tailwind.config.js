/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:theme=>({
        'gradient-radial':'radial-gradient(circle,rgba(2,0,36,1) 0%, rgba(9,9,121,1) 88%, rgba(0,212,255,1) 100%)'
      })
    },
  },
  variant:{
    extend:{},
  },
  plugins: [],
}

