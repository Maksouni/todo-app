/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        surface: { "50": "#121212", "100": "#2C2C2C", "200": "#313131", "300": "#B9B9B9" },
        primary: { "50": "#BB86FC", "100": "#9A60F2", "200": "#7A46C4", "300": "#6137A1", "400": "#4A287E", "500": "#361D5B"},
        secondary: "#03DAC6",
        button: {"default": "#444444"},
        error: "#CF6679",
        onBackground: "#FFFFFF",
        onSurface: "#FFFFFF",
        onPrimary: "#000000",
        onSecondary: "#000000",
        onError: "#000000"
      }
    },
    fontFamily: {
      'body': [
        'Roboto',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      'sans': [
        'Roboto',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      'roboto-mono': ['"Roboto Mono"', 'monospace'],
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

