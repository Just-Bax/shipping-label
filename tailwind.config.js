module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  purge: {
    content: [
      './src/**/*.vue',
      './src/**/*.ts',
      './src/**/*.tsx',
      './src/**/*.js',
      './src/**/*.jsx',
      './src/**/*.html',
    ],
  },
  darkMode: 'dark',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
