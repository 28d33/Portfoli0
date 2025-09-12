/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        text: '#e0e0e0',
        neonGreen: '#39ff14',
        neonBlue: '#00ffff',
        neonPurple: '#a020f0',
      },
      boxShadow: {
        neon: '0 0 8px #39ff14, 0 0 16px #00ffff',
      },
      fontFamily: {
        mono: ['Fira Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}

