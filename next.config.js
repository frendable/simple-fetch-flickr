const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  extensions: ['*.mod.css'],
  cssModules: true
})