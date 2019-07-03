import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import {
  BlogParagraph,
  BlogLink,
  BlogCodeBlock,
  BlogArticleContainer,
  BlogSEO,
  BlogQuote
} from 'components/Blog';
import { generatePageTheme } from 'components/AppTheme';
import DarkModeReporter from 'components/ArticleComponents/DarkModeReporter';

const BlogPage = ({ baseUrl, theme }) => (
  <>
    <BlogSEO baseUrl={baseUrl} />
    <ThemeProvider theme={theme}>
      <BlogArticleContainer>
        <BlogQuote>
          <span>Let&apos;s check your system preferences...</span>
          <span />
          <DarkModeReporter />
        </BlogQuote>
        <BlogParagraph>
          You know what really grinds my gears? Explicitly setting my OS to dark
          mode, going to a website that clearly has a dark mode, and still
          getting blasted in the retinas by all the bright shades of white.
        </BlogParagraph>
        <BlogParagraph>
          The only reasonable default mode for the web apps that have them,
          should be the user&apos;s system preference!
        </BlogParagraph>
        <BlogParagraph>
          Luckily the new media query{' '}
          <BlogLink
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme"
            paragraph
            noWrap
          >
            @media(prefers-color-scheme: dark)
          </BlogLink>
          {` `}
          is gaining{' '}
          <BlogLink
            href="https://caniuse.com/#feat=prefers-color-scheme"
            paragraph
          >
            browser support
          </BlogLink>{' '}
          to solve this exact problem.
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
        <BlogParagraph>
          In React you could check for this preference fairly easily, then
          update your app theme dynamically... and responsibly!
        </BlogParagraph>
        <BlogCodeBlock
          language="jsx"
          path="/components/DarkModeReporter.js"
          code={`
import React from 'react';

class DarkModeReporter extends React.Component {
  state = {
    supportsColorScheme: false,
    isDarkMode: false,
    isLightMode: false
  };

  componentDidMount() {
    const supportsColorScheme = window.matchMedia('(prefers-color-scheme)')
      .matches;
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
      .matches;
    const isLightMode = window.matchMedia('(prefers-color-scheme: light)')
      .matches;

    this.setState({ supportsColorScheme, isDarkMode, isLightMode });
  }

  render() {
    const { supportsColorScheme, isDarkMode, isLightMode } = this.state;

    if (supportsColorScheme) {
      if (isDarkMode) return <>Your system is in dark mode!</>;
      if (isLightMode) return <>Your system is in light mode!</>;

      // The browser supports light/dark mode but can't infer anything from the system
      return <>Your system light/dark mode preference is unset!</>;
    }

    // The browser doesn't support light/dark mode
    return <>Your browser doesn&apos;t support dark mode!</>;
  }
}

export default DarkModeReporter;          
`}
        />
        <BlogParagraph>
          For my take on implementing dynamic app themes in React with
          Styled-Components, check out my post{' '}
          <BlogLink
            href="/blog/dynamic-theming-with-styled-components-and-nextjs"
            paragraph
          >
            dynamic-theming-with-styled-components-and-nextjs
          </BlogLink>
          .
        </BlogParagraph>
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
