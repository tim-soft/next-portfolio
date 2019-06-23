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
  html {
    overflow: hidden;
  }
  body {
    margin: 0;
    background: #1D1E1F;
    font-family: 'Montserrat', sans-serif;
    text-size-adjust: 100%;
  }
  * {
      transition: all 0.2s linear;
      transition-property: background, background-color, border-color, background-image;
  }
`;
