/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' if preferred
  theme: {
    extend: {
      colors: {
        primary: '#00d590',
        secondary: '#ff0056',
        backgroundDark: '#2f2f2f',
        backgroundLight: '#f5f5f5',
        tertiary: '#374252',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  corePlugins: {
    preflight: false,
  }
};
