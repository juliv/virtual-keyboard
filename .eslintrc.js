module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'airbnb-base'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'comma-dangle': ['warn', 'never'],
    semi: ['warn', 'never'],
    'object-curly-newline': ['error', { multiline: true }],
    'no-multi-spaces': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-bitwise': 'off',
    'import/extensions': 'off',
    'linebreak-style': ['error', 'unix']
  }
}
