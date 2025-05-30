import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';


const config: Config = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
		darkMode: 'class', // penting!
    extend: {
      fontFamily: {
        // override default sans to Lato
        sans: ['Lato', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
        manrope: ['Manrope', ...defaultTheme.fontFamily.sans],
      },
      fontWeight: {
        normal: '400',
      },
      colors: {
        primary: '#BD9E72',
        secondary: '#A07C4B',
        gradient: {
          from: '#BD9E72',
          to: '#A07C4B'
        },

        // Neutral
        black: '#1E293B',
        white: '#FFFFFF',
        gray: '#94A3B8',

        // Semantic
        info: '#1A73E8',
        success: '#20D55B',
        warning: '#FFC409',
        danger: '#DC4C64',
      },
      maxWidth: {
        container: '600px'
      },
			width: {
				container: '600px'
			}
    },
  },
  plugins: [],
}
export default config;
