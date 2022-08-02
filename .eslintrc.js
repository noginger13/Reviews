module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'linebreak-style': 0,
    'no-console': 'off',
    'comma-dangle': ['error', 'never'],
    'operator-linebreak': ['error', 'after'],
    'default-param-last': ['error', 'never']
  }
};