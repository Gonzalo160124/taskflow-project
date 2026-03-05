/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      colors: {
        'sao-bg':      '#020b18',
        'sao-surface': '#041428',
        'sao-border':  '#0a3a6e',
        'sao-accent':  '#00cfff',
        'sao-red':     '#ff4e6a',
        'sao-yellow':  '#ffe066',
        'sao-text':    '#cce8ff',
        'sao-muted':   '#3a6a99',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body:    ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
