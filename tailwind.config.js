/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto Mono, monospace",
      },
      colors: {
        pizza: "#123456",
      },
    },
  },
  plugins: [],
};
