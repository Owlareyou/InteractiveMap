/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      // Every colour resolves to a custom property defined in src/styles/tokens.css,
      // so components never carry a hex value and SVG attributes can use the same
      // token via var(). Adding a colour here without a token is a mistake.
      colors: {
        surface: {
          base: 'var(--surface-base)',
          raised: 'var(--surface-raised)',
          sunken: 'var(--surface-sunken)',
        },
        content: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        edge: {
          subtle: 'var(--border-subtle)',
          strong: 'var(--border-strong)',
        },
        accent: 'var(--accent)',
        valence: {
          positive: 'var(--valence-positive)',
          neutral: 'var(--valence-neutral)',
          negative: 'var(--valence-negative)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
}
