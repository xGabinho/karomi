/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#805295",
        secondary: "#56bfd2",
        third: "#eb6291",
        fourth: "#2d2e6c",
      },
    },
  },
  plugins: [],
};