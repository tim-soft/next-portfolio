import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import {
  BlogArticleContainer,
  BlogSEO,
  BlogParagraph,
  BlogList,
  BlogSectionHeading,
  BlogCodeBlock,
  BlogLink,
  BlogQuote
} from 'components/Blog';
import { generatePageTheme } from 'components/AppTheme';
import Button from 'components/Button';
import colors from 'nice-color-palettes/500';
import bestContrast from 'get-best-contrast-color';
import getContrastRatio from 'get-contrast-ratio';

/**
 * Picks a random top-rated color palette from https://www.colourlovers.com/
 * to generate a page theme.
 *
 * https://github.com/Jam3/nice-color-palettes
 */
const generateColorPalette = () => {
  // Font and Highlight Font contrast must equal or exceed
  // this value against background color
  const CONTRAST_THRESHOLD = 3.4;

  let backgroundColor;
  let fontColor;
  let highlightFontColor;

  // Returns true if background-font contrast is above CONTRAST_THRESHOLD
  // otherwise false
  const goodBackgroundContrast = () => {
    if (
      getContrastRatio(backgroundColor, fontColor) >= CONTRAST_THRESHOLD &&
      getContrastRatio(backgroundColor, highlightFontColor) >=
        CONTRAST_THRESHOLD
    )
      return true;

    return false;
  };

  // Find color palette with good contrast
  do {
    // Choose random color palette
    const palette =
      colors[Math.floor(Math.random() * Math.floor(colors.length))];

    // Find good background/font colors within palette
    // eslint-disable-next-line no-restricted-syntax
    for (const currBackground of palette) {
      // Set theme colors based on current background of palette
      backgroundColor = currBackground;
      fontColor = bestContrast(currBackground, palette);
      highlightFontColor = bestContrast(
        currBackground,
        // eslint-disable-next-line no-loop-func
        palette.filter(color => color !== fontColor)
      );

      // Use current palette colors if they meet contrast threshold
      if (goodBackgroundContrast()) break;
    }
  } while (!goodBackgroundContrast());

  return generatePageTheme({
    fontColor,
    highlightFontColor,
    backgroundColor
  });
};

const BlogPage = ({ baseUrl, theme, updateTheme }) => (
  <>
    <BlogSEO baseUrl={baseUrl} />
    <ThemeProvider theme={theme}>
      <BlogArticleContainer>
        <BlogSectionHeading>
          <span role="img" aria-label="lit">
            🔥
          </span>{' '}
          Demo First{' '}
          <span role="img" aria-label="lit">
            🔥
          </span>{' '}
        </BlogSectionHeading>
        <BlogSectionHeading style={{ margin: 0, fontSize: '1.2em' }}>
          Choose a new page theme
        </BlogSectionHeading>
        <ToggleThemeContainer>
          <RainbowButton onClick={() => updateTheme(generateColorPalette())}>
            Random???
          </RainbowButton>
          <Button
            onClick={() =>
              updateTheme(
                generatePageTheme({
                  fontColor: 'black',
                  highlightFontColor: 'cyan',
                  backgroundColor: '#9e9e9e'
                })
              )
            }
          >
            Grey Theme
          </Button>

          <Button
            onClick={() =>
              updateTheme(
                generatePageTheme({
                  fontColor: '#31d7f9',
                  highlightFontColor: 'springgreen',
                  backgroundColor: '#202629'
                })
              )
            }
          >
            Blue Theme
          </Button>
          <Button
            onClick={() =>
              updateTheme(
                generatePageTheme({
                  fontColor: '#e2e5ec',
                  highlightFontColor: 'aquamarine',
                  backgroundColor: '#101010'
                })
              )
            }
          >
            Dark Theme
          </Button>
          <Button onClick={() => updateTheme({})}>Default</Button>
        </ToggleThemeContainer>
        <BlogQuote>
          Click that random button a few times, what is it doing?
        </BlogQuote>
        <BlogParagraph>
          When I go about building themable React apps, I usually have three
          concerns
        </BlogParagraph>
        <BlogList>
          <li>
            The entire app <i>has</i> a theme
          </li>
          <li>
            A page <i>can have</i> a theme
          </li>
          <li>
            The page or app theme can change <i>at runtime</i>
          </li>
        </BlogList>
        <BlogParagraph>
          Concerns #1 and #2 are what you see on this page right now. Clicking
          through the links of this blog, every page has it&apos;s own unique
          set of theme variables such as background and font colors, which
          optionally override the default app theme.
        </BlogParagraph>
        <BlogParagraph>
          The venerable CSS-in-JS library{' '}
          <BlogLink
            href="https://github.com/styled-components/styled-components"
            paragraph
          >
            <code>styled-components</code>
          </BlogLink>{' '}
          comes with a{' '}
          <BlogLink
            href="https://www.styled-components.com/docs/advanced#theming"
            paragraph
          >
            <code>{`<ThemeProvider theme={theme}/>`}</code>
          </BlogLink>{' '}
          component which uses React context to pass it&apos;s theme variables
          to any of it&apos;s child components.
        </BlogParagraph>
        <BlogParagraph>
          In a Next.js app, it&apos;s easy to apply this{' '}
          <code>ThemeProvider</code> to all pages by wrapping{' '}
          <code>{`<Component />`}</code> in{' '}
          <BlogLink href="https://nextjs.org/docs#custom-app" paragraph>
            <code>/pages/_app.js</code>
          </BlogLink>
          .
        </BlogParagraph>
        <BlogCodeBlock
          language="jsx"
          path="/pages/_app.js"
          code={`
render() {
  const { Component, pageProps } = this.props;
  const appTheme = {
    fontColor: 'black',
    backgroundColor: 'white'
  };

  return (
    <Container>
      <ThemeProvider theme={appTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Container>
  );
}
        `}
        />
        <BlogParagraph>
          Since all pages are descendants of <code>{`<ThemeProvider />`}</code>{' '}
          any page now has easy access to <code>fontColor</code> and{' '}
          <code>backgroundColor</code>.
        </BlogParagraph>
        <BlogCodeBlock
          language="jsx"
          path="/pages/cool-page.js"
          code={`
import styled from 'styled-components';

const Page = ({ routeIsAnimating, theme }) => (
  <StyledDiv>
    I am a themed page!
  </StyledDiv>
);

export default Page;

const StyledDiv = styled.div\`
  background-color: ${`{({ theme }) => theme.backgroundColor }`};
  color: ${`{({ theme }) => theme.fontColor }`};
\`;
        `}
        />
        <BlogCodeBlock
          language="jsx"
          path="/pages/_app.js"
          code={`
import App, { Container } from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";
import appTheme from "../components/appTheme";
import GlobalStyles from "../components/GlobalStyles";
import WebsiteLayout from "../layouts/WebsiteLayout";

export default class WebApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  state = {
    dynamicPageThemes: []
  };

  /**
   * Updates the current page's theme with provided variables
   *
   * @param dynamicTheme object
   */
  updateTheme = dynamicTheme => {
    const { dynamicPageThemes } = this.state;
    const { route } = this.props.router;

    const pageIndex = dynamicPageThemes.findIndex(page => page.route === route);

    if (pageIndex === -1) dynamicPageThemes.push({ route, dynamicTheme });
    else dynamicPageThemes[pageIndex] = { route, dynamicTheme };

    this.setState({ dynamicPageThemes });
  };

  /**
   * Retrieves any dynamic theme vars for current page
   *
   * @returns object
   */
  getDynamicPageTheme = () => {
    const { route } = this.props.router;
    const { dynamicPageThemes } = this.state;
    const dynamicPageTheme = dynamicPageThemes.find(
      pageTheme => pageTheme.route === route
    );

    return dynamicPageTheme ? dynamicPageTheme.dynamicTheme : {};
  };

  render() {
    const { Component, pageProps } = this.props;
    const { pageTheme } = Component;
    const dynamicTheme = this.getDynamicPageTheme();

    // _app level theme variables, wrapping the entire layout
    const theme = {
      // Theme variables defined in /src/components
      ...appTheme,
      // Add any theme variables provided by the page/route level component
      ...pageTheme,
      // Override any static page variables with dynamically set variables
      ...dynamicTheme
    };

    return (
      <Container>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <WebsiteLayout>
            <Component {...pageProps} updateTheme={this.updateTheme} />
          </WebsiteLayout>
        </ThemeProvider>
      </Container>
    );
  }
}                   
          `}
        />
        <BlogParagraph>
          <BlogLink
            href="https://codesandbox.io/s/nextjs-dynamic-theming-ibw4p"
            paragraph
          >
            Check out the full demo on CodeSandbox
          </BlogLink>
        </BlogParagraph>
      </BlogArticleContainer>
    </ThemeProvider>
  </>
);

const fontColor = 'black';
const highlightFontColor = 'springgreen';
const backgroundColor = '#008000';

// _app.js level theme variable overrides
BlogPage.theme = {
  headerNavFontColor: fontColor,
  headerNavTextUnderlineColor: highlightFontColor,
  headerNavHoverFontColor: highlightFontColor,
  headerNavHamburgerIconColor: fontColor,
  pageBackgroundColor: backgroundColor,
  pageContentFontColor: fontColor,
  pageContentLinkHoverColor: highlightFontColor
};

BlogPage.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  theme: PropTypes.object,
  updateTheme: PropTypes.func.isRequired
};

BlogPage.defaultProps = {
  theme: {}
};

// Override default app theme for this page
BlogPage.pageTheme = generatePageTheme({
  fontColor: 'black',
  highlightFontColor: 'springgreen',
  backgroundColor: '#008000'
});

// Get absolute url of page
BlogPage.getInitialProps = async ({ req }) => {
  const hostname = req ? req.headers.host : window.location.hostname;
  const protocol = hostname.includes('localhost') ? 'http' : 'https';

  return { baseUrl: `${protocol}/${hostname}` };
};

export default BlogPage;

const ToggleThemeContainer = styled.div`
  border-radius: 8px;
  border-color: ${({ theme }) => theme.popoutMenuBorderColor};
  border-width: 2px;
  border-style: solid;
  padding: 2em;
  margin: 1em 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  > * {
    margin: 1em;
  }
`;

const RainbowButton = styled(Button)`
  border-image: linear-gradient(
    to bottom right,
    #b827fc 0%,
    #2c90fc 25%,
    #b8fd33 50%,
    #fec837 75%,
    #fd1892 100%
  );
  border-image-slice: 1;
  border-width: 3px;
`;
