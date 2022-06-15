/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A972FF',
        secondary: '#3E2CA6',
        blue: '#1CB4FF',
        green: '#4AD9C1',
        pink: '#E81C6F',
        dark: '#030514',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
