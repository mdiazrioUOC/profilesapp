/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#050f56',
        'secondary': '#E2F4FF',
        'navy':{
          900:'#050f56'
        }
      }
    },
  },
  plugins: [],
}

