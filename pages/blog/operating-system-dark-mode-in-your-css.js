import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import {
  BlogParagraph,
  BlogLink,
  BlogCodeBlock,
  BlogArticleContainer,
  BlogSEO
} from 'components/Blog';
import { generatePageTheme } from 'components/AppTheme';

const BlogPage = ({ baseUrl, theme }) => (
  <>
    <BlogSEO baseUrl={baseUrl} />
    <ThemeProvider theme={theme}>
      <BlogArticleContainer>
        <BlogParagraph>
          Already have a dark mode in your web app? Why not set a sensible
          default for your users by mirroring their system&apos;s dark mode
          preferences!
        </BlogParagraph>

        <BlogParagraph>
          You can access this preference via the new media query{' '}
          <BlogLink
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme"
            paragraph
            noWrap
          >
            @media(prefers-color-scheme: dark)
          </BlogLink>
        </BlogParagraph>

        <BlogCodeBlock
          language="css"
          path="styles/theme.css"
          code={`
/* The browser supports prefers-color-scheme,
but cannot find a light/dark preference */
@media (prefers-color-scheme: no-preference) {
  background: black;
  color: white;
}

/* Use dark mode */
@media (prefers-color-scheme: dark) {
  background: black;
  color: white;
}

/* Use light mode */
@media (prefers-color-scheme: light) {
  background: white;
  color: black;
}
      `}
        />
        <BlogParagraph>
          Use the{' '}
          <BlogLink
            href="https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia"
            paragraph
            noWrap
          >
            Window.matchMedia()
          </BlogLink>{' '}
          function to retrieve this setting programatically in Javascript.
        </BlogParagraph>
        <BlogCodeBlock
          language="js"
          path="console"
          code={`
// true if the browser supports prefers-color-scheme
window.matchMedia("(prefers-color-scheme)").matches

// true if there is a system level dark mode preference
window.matchMedia("(prefers-color-scheme: dark)").matches
      `}
        />
      </BlogArticleContainer>
    </ThemeProvider>
  </>
);

BlogPage.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  theme: PropTypes.object
};

BlogPage.defaultProps = {
  theme: {}
};

// Override default app theme for this page
BlogPage.pageTheme = generatePageTheme({
  fontColor: '#e2e5ec',
  highlightFontColor: 'aquamarine',
  backgroundColor: '#101010'
});

// Get URL and generate page theme
BlogPage.getInitialProps = async ({ req }) => {
  const hostname = req ? req.headers.host : window.location.hostname;
  const protocol = hostname.includes('localhost') ? 'http' : 'https';

  return { baseUrl: `${protocol}/${hostname}` };
};

export default BlogPage;
