/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.{html,ejs}', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [require('tw-elements/dist/plugin')],
}
