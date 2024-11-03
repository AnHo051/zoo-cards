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
    },
  },
  plugins: [],
};
