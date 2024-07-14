/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/*.{js,jsx}", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans"],
      },
      colors: {
        main: "#232932",
        secondary: "#00ADB5",
        "secondary-hover": "#069BA2",
      },
    },
  },
  plugins: [],
};
