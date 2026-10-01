/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Syne', 'sans-serif'],
      },
      colors: {
        dark: {
          950: '#070709', // Obsidian black
          900: '#0C0C10',
          800: '#15151A',
          border: 'rgba(255, 255, 255, 0.08)',
        }
      },
    },
  },
  plugins: [],
}
