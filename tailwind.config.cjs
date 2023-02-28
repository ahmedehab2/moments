/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "slide-in": "slide 0.5s ease-in-out",
      },
      keyframes: {
        slide: {
          "0%": { left: "-500px" },
          "100%": { left: "0px" },
        },
      },
    },
  },
  plugins: [],
};
