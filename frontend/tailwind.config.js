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
        // Premium Palette
        primary: {
          DEFAULT: '#2563EB', // Royal Blue
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563EB',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#8B5CF6', // Violet
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8B5CF6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
          foreground: '#ffffff',
        },
        background: {
          DEFAULT: '#f8fafc', // Slate-50
          dark: '#0f172a',    // Slate-900
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#1e293b',    // Slate-800
        },
        // Semantic aliases for compatibility
        seashell: '#f8fafc',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
