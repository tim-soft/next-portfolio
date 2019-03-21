/**
 * Configure Babel
 *
 * https://babeljs.io/docs/en/configuration
 */
module.exports = {
  presets: [['next/babel']],
  plugins: [['styled-components', { ssr: true }]]
};
