/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
