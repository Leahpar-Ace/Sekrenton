/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tells Tailwind which files to watch for utility classes to compile
  content: [
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
    "./src/**/*.{css,js}",
    "./*.html"
  ],
  theme: {
    extend: {
      // 1. Core Typography Scale Sync
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      
      // 2. Global Sekrenton Brand & Accent Tokens Mapping
      colors: {
        sekrenton: {
          midnight: '#29245F',
          violet: '#564DB5',
          slate: '#7D81A4',
          lightSlate: '#B8BBD1',
        },
        status: {
          success: '#00B8A9',
          error: '#EF4444',
        }
      },

      // 3. Structural Component Border Radius Alignment
      borderRadius: {
        'btn': '4px',       // Button primitives component rule
        'input': '6px',     // Form Text Input components rule
        'card': '12px',     // Base Standard Layout Cards rule
      }
    },
  },
  plugins: [],
}