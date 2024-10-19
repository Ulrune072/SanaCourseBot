/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.html',  // пути к вашим шаблонам
    './theme/static/theme/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#B8860B',
      },
    },
  },
  plugins: [],
}
}
