/**
 * Configure Babel
 *
 * @see https://babeljs.io/docs/en/configuration
 */
module.exports = {
    presets: [['next/babel']],
    plugins: [['styled-components', { ssr: true }]]
};
