/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#1d4ed8',
          700: '#1e40af',
          900: '#1e2d6b',
        },
        arena: {
          blue:   '#1a3fa3',
          navy:   '#0f1f5c',
          teal:   '#0891b2',
          gold:   '#f59e0b',
        },
      },
      fontFamily: {
        sans:    ['Lato', 'Georgia', 'sans-serif'],
        serif:   ['Playfair Display', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.07)',
        hover: '0 8px 32px rgba(26,63,163,0.15)',
      },
    },
  },
  plugins: [],
}


