/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Inconsolata", "monospace"],
        title: ["Sixtyfour Convergence", "sans-serif"],
        button: ["Protest Strike", "sans-serif"],
      },
      screens: {
        "2xl": "1400px",
        "3xl": "1900px",
      },
      zIndex: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
      },
      colors: {
        primary: {
          600: "#E03437",
          700: "#8a1316",
        },
      },
    },
  },
  plugins: [],
};
