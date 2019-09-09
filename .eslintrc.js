/**
 * Configure ESLint
 *
 * @see https://eslint.org/docs/user-guide/configuring
 */
module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['airbnb', 'prettier', 'prettier/react', 'plugin:import/warnings'],
  plugins: ['prettier', 'import', 'jsx-a11y', 'react-hooks'],
  globals: {
    document: true,
    window: true,
    process: true
  },
  rules: {
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': 0,
    'react/react-in-jsx-scope': 0,
    'class-methods-use-this': 0,
    'no-unused-expressions': ['error', { allowTaggedTemplates: true }],
    'react/no-unused-prop-types': 0,
    'consistent-return': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'import/no-extraneous-dependencies': 0,
    'prettier/prettier': 'error',
    'react/destructuring-assignment': 0,
    'react/static-property-placement': 0,
    'react/jsx-props-no-spreading': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  settings: {
    // Resolve modules from the root dir
    // https://github.com/benmosher/eslint-plugin-import
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', `.`]
      }
    }
  }
};
