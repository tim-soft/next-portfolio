/**
 * Configure Stylint to work with Styled-Components
 *
 * @see https://www.styled-components.com/docs/tooling#stylelint
 */
module.exports = {
    processors: ['stylelint-processor-styled-components'],
    extends: [
        'stylelint-config-recommended',
        'stylelint-config-styled-components',
    ],
};
