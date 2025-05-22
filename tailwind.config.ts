import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A07C4b',
        primaryHover: '#bd9E72'
      },
      maxWidth: {
        container: '650px'
      }
    },
  },
  plugins: [],
}
export default config;
