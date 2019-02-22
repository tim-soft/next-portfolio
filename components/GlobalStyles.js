import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';

/* Adds global styles and normalize.css to the app */
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
