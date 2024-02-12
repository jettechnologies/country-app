/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "nunito": ['Nunito Sans', "sans-serif"],
    },
    colors:{
      "dark-blue-el": "hsl(209, 23%, 22%)",
      "dark-blue-bg": "hsl(207, 26%, 17%)",
      "light-mode-text": "hsl(200, 15%, 8%)",
      "light-mode-input": "hsl(0, 0%, 52%)",
      "light-mode-bg": "hsl(0, 0%, 98%)",
      "white": "hsl(0, 0%, 100%)",
    },
    fontSize: {
      "size-400": ["14px", "1.4em"],
      "size-500": ["16px", "1.4em"],
      "size-600": ["18px", "1.4em"],
      "size-700": ["22px", "1.5em"],
      "size-800": ["25px", "1.6em"],
    },
    extend: {
      screens: {
        "current" : "1360px"
      }
    },
  },
  plugins: [],
}

