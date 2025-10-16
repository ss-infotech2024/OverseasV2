/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#581c87',
        darkPurple: '#581c87',
        lightLavender: '#D8B4FF',
        softWhite: '#FAFAFA',
        baseGray: '#333333',
        lightGray: '#F5F5F5',
      },
      backgroundImage: {
        'gradient-soft': 'linear-gradient(to bottom right, #FDEFF9, #ECF0FF)',
      },
      fontFamily: {
        plein: ['Plein', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
