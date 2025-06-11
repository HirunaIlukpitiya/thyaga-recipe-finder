/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F97316',
        'primary-dark': "#EF4544",
        'primary-light': '#F88C38',
        'secondary': '#4ECDC4',
        'background': '#F9FAFB',
      }
    },
  },
  plugins: [],
}