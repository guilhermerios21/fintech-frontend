/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6D4AFF',
          hover: '#5938F0',
        },
        secondary: {
          DEFAULT: '#111827',
          light: '#374151',
        },
        surface: '#FFFFFF',
        muted: '#6B7280',
        background: '#F2F2F4'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
