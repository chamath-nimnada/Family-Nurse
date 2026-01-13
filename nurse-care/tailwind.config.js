/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#14b8a6", // Teal-500
        secondary: "#0d9488", // Teal-600
        accent: "#f0fdfa", // Teal-50
      },
    },
  },
  plugins: [],
}