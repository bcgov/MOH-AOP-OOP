module.exports = {
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended', 
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jest-formatting/recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: [
    "jest", 
    "jest-formatting",
    "cypress"
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "warn",
    "jest/no-identical-title": "warn",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
    "no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]
    
    
  },
  overrides: [
    //Unit tests run in Jest, so environment needs to be Jest
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    },
    //E2E tests run in Cypress, so environment needs to be Mocha
    {
      files: [
        '**/tests/e2e/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        mocha: true,
        'cypress/globals': true
      },
    }
  ]
}
