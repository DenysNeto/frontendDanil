module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // путь к твоим компонентам
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: "rgba(81, 255, 163, 1)",
        info: "rgba(46, 140, 255, 1)",
        comparison:"rgba(41, 122, 151, 0.1)"
      },
    },
  },
  plugins: [],
};
