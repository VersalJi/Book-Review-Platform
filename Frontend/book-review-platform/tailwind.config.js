/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        btnColor: '#99ca3e'
      }
    },
  },
  plugins: [
    // ...
    require('tailwind-scrollbar'),
],
}

