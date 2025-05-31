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
        primary: {
					DEFAULT: '#BD9E72',
          50:  '#FDF8F3',
          100: '#F8EFE5',
          200: '#F1DFC9',
          300: '#E7CBA5',
          400: '#D8B376',
          500: '#BD9E72',  // utama
          600: '#A07C4B',
          700: '#7A5D39',
          800: '#5C4229',
          900: '#422E1D',
          950: '#291A10',
        },
        secondary: '#A07C4B',
        gradient: {
          to: '#BD9E72',
          from: '#A07C4B'
        },

        // Neutral
        black: {
					DEFAULT: '#52525B',
          50:  '#F4F4F5',
          100: '#E4E4E7',
          200: '#D4D4D8',
          300: '#A1A1AA',
          400: '#71717A',
          500: '#52525B',  // utama
          600: '#3F3F46',
          700: '#27272A',
          800: '#18181B',
          900: '#0F0F10',
          950: '#070708',
        },
        gray: {
					DEFAULT: '#6B7280',
          50:  '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',  // utama
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#0B0F16',
        },

        // Semantic
        info: '#1A73E8',
        success: '#20D55B',
        warning: '#FFC409',
        danger: '#DC4C64',
				rating: '#FF9500',

				dark: '#0A0C13',
				"dark-secondary": '#0F172A',
      },
      maxWidth: {
        container: '500px'
      },
			width: {
				container: '500px'
			},
			borderColor: {
        DEFAULT: '#C5C5C5',
      },
    },
  },
  plugins: [],
}
export default config;
