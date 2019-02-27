import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';

/**
 * Adds global styles and normalize.css used in /pages/_app.js
 *
 * http://nicolasgallagher.com/about-normalize-css/
 * https://www.styled-components.com/docs/api#createglobalstyle
 */
export default createGlobalStyle`
  ${styledNormalize}
  body {
    margin: 0;
    background: #1D1E1F;
    font-family: 'Montserrat', sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }
`;
