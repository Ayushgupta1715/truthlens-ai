/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#02040A',
          900: '#060914',
          850: '#0B0F20',
          800: '#11172E',
          700: '#1C2442',
          600: '#2A365F',
        },
        cyber: {
          cyan: '#00F2FE',
          blue: '#4FACFE',
          indigo: '#6366F1',
          purple: '#A855F7',
          pink: '#EC4899',
          emerald: '#10B981',
          ruby: '#F43F5E',
          amber: '#F59E0B',
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 30px -5px rgba(0, 242, 254, 0.35)',
        'glow-blue': '0 0 35px -5px rgba(79, 172, 254, 0.35)',
        'glow-purple': '0 0 35px -5px rgba(168, 85, 247, 0.35)',
        'glow-ruby': '0 0 35px -5px rgba(244, 63, 94, 0.35)',
        'glow-emerald': '0 0 35px -5px rgba(16, 185, 129, 0.35)',
      }
    },
  },
  plugins: [],
}
