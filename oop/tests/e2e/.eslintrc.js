module.exports = {
  plugins: [
    'cypress',
    'mocha'
  ],
  env: {
    mocha: true,
    'cypress/globals': true
  },
  rules: {
    strict: 'off'
  },
}
