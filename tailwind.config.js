/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#05157a',
        'secondary': '#E2F4FF',
        'navy':{
          900:'#05157a'
        }
      }
    },
  },
  plugins: [],
}

