/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '11/20': "55%",
        '9/20': "45%"
      }
    },
  },
  plugins: [],
}