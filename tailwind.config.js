/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#071726',
          deep: '#071726',
          dark: '#0B1D2C',
          mid: '#12293C',
          lift: '#1A3446',
        },
        ivory: '#F5F0E7',
        warm: '#FAF8F2',
        beige: '#E8E0D2',
        gold: {
          DEFAULT: '#C6A56A',
          soft: '#D6BD8D',
          deep: '#A8874B',
        },
        ink: '#17212B',
        muted: '#69727A',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      letterSpacing: {
        label: '0.2em',
        nav: '0.09em',
        wide: '0.06em',
      },
      maxWidth: {
        shell: '1400px',
      },
      borderRadius: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '6px',
      },
      boxShadow: {
        panel: '0 30px 70px -34px rgba(7, 23, 38, 0.45)',
        soft: '0 18px 44px -28px rgba(7, 23, 38, 0.4)',
        card: '0 22px 50px -30px rgba(7, 23, 38, 0.5)',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        400: '400ms',
        500: '500ms',
        700: '700ms',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'line-grow': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
        'slow-zoom': {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(1.08)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 800ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 900ms ease-out both',
        'line-grow': 'line-grow 900ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'slow-zoom': 'slow-zoom 18s ease-out both',
      },
    },
  },
  plugins: [],
}
