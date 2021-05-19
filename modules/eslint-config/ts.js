// Typescript Eslint Config
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: '>=16.8.3',
    },
  },
  plugins: ['@typescript-eslint', 'prettier', 'react', 'react-hooks', 'simple-import-sort'],
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  env: {
    es6: true,
    node: true,
    browser: true,
    commonjs: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],
    'constructor-super': 'error',
    'no-this-before-super': 'error',
    'no-duplicate-case': 'error',
    'no-dupe-keys': 'error',
    'no-func-assign': 'error',
    'no-sparse-arrays': 'error',
    'no-unsafe-negation': 'error',
    'no-unreachable': 'error',
    'valid-typeof': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'ignore' }],
    'react/no-string-refs': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/react-in-jsx-scope': 'error',
    'react/require-render-return': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'simple-import-sort/imports': 'error',
  },
}
