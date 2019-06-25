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
  BlogLink
} from 'components/Blog';
import { generatePageTheme } from 'components/AppTheme';
import Button from 'components/Button';
import colors from 'nice-color-palettes/1000';
import bestContrast from 'get-best-contrast-color';
import getContrastRatio from 'get-contrast-ratio';

/**
 * Picks a random top color palette from https://www.colourlovers.com/
 * to generate a page theme.
 *
 * https://github.com/Jam3/nice-color-palettes
 */
const generateColorPalette = () => {
  const CONTRAST_THRESHOLD = 3.4;
  let backgroundColor;
  let fontColor;
  let highlightFontColor;

  let paletteIterations = 0;
  let colorIterations = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // Choose random color palette
    const palette =
      colors[Math.floor(Math.random() * Math.floor(colors.length))];

    paletteIterations += 1;

    // eslint-disable-next-line no-restricted-syntax
    for (const currBackground of palette) {
      colorIterations += 1;

      const currFontColor = bestContrast(currBackground, palette);
      const currHighlightFontColor = bestContrast(
        currBackground,
        // eslint-disable-next-line no-loop-func
        palette.filter(color => color !== currFontColor)
      );

      const currFontContrast = getContrastRatio(currBackground, currFontColor);
      const currFontHighlightContrast = getContrastRatio(
        currBackground,
        currHighlightFontColor
      );

      // Set initial colors, update if a better contrast is found
      if (!backgroundColor) {
        backgroundColor = currBackground;
        fontColor = currFontColor;
        highlightFontColor = currHighlightFontColor;
      } else {
        const fontContrast = getContrastRatio(backgroundColor, fontColor);
        const highlightFontContrast = getContrastRatio(
          backgroundColor,
          highlightFontColor
        );

        // If the current background color has suitable contrast
        // with the font colors then exit loop
        if (
          fontContrast > CONTRAST_THRESHOLD &&
          highlightFontContrast > CONTRAST_THRESHOLD
        ) {
          break;
        }

        if (
          currFontContrast > fontContrast &&
          currFontHighlightContrast > highlightFontContrast
        ) {
          backgroundColor = currBackground;
          fontColor = currFontColor;
          highlightFontColor = currHighlightFontColor;
        }
      }
    }

    const fontContrast = getContrastRatio(backgroundColor, fontColor);
    const highlightFontContrast = getContrastRatio(
      backgroundColor,
      highlightFontColor
    );

    if (
      fontContrast > CONTRAST_THRESHOLD &&
      highlightFontContrast > CONTRAST_THRESHOLD
    ) {
      break;
    }
  }

  // eslint-disable-next-line no-console
  console.log('palette iterations', paletteIterations);
  // eslint-disable-next-line no-console
  console.log('color iterations', colorIterations);

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
        <BlogParagraph>
          When you think of theming your React app, there are really two
          situations you will encounter
        </BlogParagraph>
        <BlogList>
          <li>Theming entire pages as they are loaded</li>
          <li>Dynamically changing themes after these pages have loaded</li>
        </BlogList>
        <BlogParagraph>
          The first situation is what you see on this page right now. Clicking
          through the links of this blog, every page has it&apos;s own unique
          set of theme variables such as background and font colors.
        </BlogParagraph>
        <BlogParagraph>
          The second situation is a bit trickier. Changes to the page theme must
          be triggered by a state change, and these new values need to be
          supplied to the <code>styled-components</code> module{' '}
          <code>{`<ThemeProvider />`}</code>
        </BlogParagraph>
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
