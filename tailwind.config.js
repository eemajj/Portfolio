/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  safelist: [
    // Force include responsive utilities
    'lg:hidden',
    'lg:flex', 
    'lg:block',
    'xs:block',
    'sm:inline',
    'sm:hidden'
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        // Bangkok Metropolitan Administration Official Colors
        bangkok: {
          // Main BMA Green (สีเขียวกทม.)
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#16a34a', // Official BMA Green
          600: '#15803d',
          700: '#134e26',
          800: '#14532d',
          900: '#0f3f1f'
        },
        primary: {
          // Enhanced BMA Primary Colors
          50: '#f7fef8',
          100: '#edfcf0',
          200: '#d4f7db',
          300: '#b0efbc',
          400: '#84e194',
          500: '#16a34a', // Core BMA Green
          600: '#15803d',
          700: '#14652f',
          800: '#165228',
          900: '#144422'
        },
        secondary: {
          // BMA Gold/Yellow accent (สีทอง)
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // BMA Gold
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f'
        },
        accent: {
          // BMA Blue (สีฟ้า)
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // BMA Blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        },
        neutral: {
          // BMA Gray tones
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717'
        }
      },
      fontFamily: {
        'bangkok': ['SaoChingcha', 'BKKDraft', 'Inter', 'Noto Sans Thai', 'sans-serif'],
        'thai': ['SaoChingcha', 'Noto Sans Thai', 'sans-serif'],
        'en': ['BKKDraft', 'Inter', 'sans-serif'],
        'saochingcha': ['SaoChingcha', 'BKKDraft', 'sans-serif'],
        'bkkdraft': ['BKKDraft', 'Inter', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
