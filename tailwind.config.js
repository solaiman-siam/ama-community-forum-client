/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    fontFamily: {
      roboto: ["'Roboto', sans-serif"],
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
