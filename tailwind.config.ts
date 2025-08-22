
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f7ff',
          100: '#e6efff',
          200: '#c5dbff',
          300: '#9fc2ff',
          400: '#6ea0ff',
          500: '#3d7eff',
          600: '#1f63ff',
          700: '#124fe0',
          800: '#0f3fb3',
          900: '#0f358f'
        }
      }
    },
  },
  plugins: [],
}
export default config
