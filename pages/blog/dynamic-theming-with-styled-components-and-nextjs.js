import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import styled, { ThemeProvider } from 'styled-components';
import {
  BlogArticleContainer,
  BlogSEO,
  BlogParagraph,
  BlogList,
  BlogSectionHeading,
  BlogCodeBlock,
  BlogLink,
  BlogQuote,
  BlogCodeInline,
  BlogDemoContainer
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

/**
 * Remove window hash before updating page theme
 * to prevent scrolling to hash id
 */
const handleThemeChange = callback => {
  if (window.location.hash) {
    const href = Router.route;
    const as = href;
    Router.push(href, as, { shallow: true }).then(() => {
      callback();
    });
  } else {
    callback();
  }
};

const BlogPage = ({ baseUrl, theme, updateTheme }) => (
  <>
    <BlogSEO baseUrl={baseUrl} />
    <ThemeProvider theme={theme}>
      <BlogArticleContainer>
        <BlogDemoContainer
          heading="Demo First"
          subheading="Choose a new page theme"
        >
          <RainbowButton
            onClick={() => {
              handleThemeChange(() => updateTheme(generateColorPalette()));
            }}
          >
            Random???
          </RainbowButton>
          <Button
            onClick={() => {
              handleThemeChange(() =>
                updateTheme(
                  generatePageTheme({
                    fontColor: 'black',
                    highlightFontColor: 'cyan',
                    backgroundColor: '#9e9e9e'
                  })
                )
              );
            }}
          >
            Grey Theme
          </Button>

          <Button
            onClick={() => {
              handleThemeChange(() =>
                updateTheme(
                  generatePageTheme({
                    fontColor: '#31d7f9',
                    highlightFontColor: 'springgreen',
                    backgroundColor: '#202629'
                  })
                )
              );
            }}
          >
            Blue Theme
          </Button>
          <Button
            onClick={() => {
              handleThemeChange(() =>
                updateTheme(
                  generatePageTheme({
                    fontColor: '#e2e5ec',
                    highlightFontColor: 'aquamarine',
                    backgroundColor: '#101010'
                  })
                )
              );
            }}
          >
            Dark Theme
          </Button>
          <Button
            onClick={() => {
              handleThemeChange(() => updateTheme({}));
            }}
          >
            Default
          </Button>
        </BlogDemoContainer>
        <BlogQuote>
          <span>Click that random button a few times, what is it doing?</span>
          <TableOfContents>
            <span>Skip Ahead:</span>
            <BlogLink
              paragraph
              href="/blog/dynamic-theming-with-styled-components-and-nextjs#the-dynamic-page-theme"
            >
              The Dynamic Page Theme
            </BlogLink>
            <BlogLink
              paragraph
              href="/blog/dynamic-theming-with-styled-components-and-nextjs#the-random-button"
            >
              The Random Button
            </BlogLink>
          </TableOfContents>
        </BlogQuote>

        <BlogParagraph>
          When building themable React apps, I have three primary concerns:
        </BlogParagraph>
        <BlogList>
          <li>
            The entire app <i>has</i> a theme.
          </li>
          <li>
            A single page <i>can have</i> a theme.
          </li>
          <li>
            The page or app theme can change <i>at runtime.</i>
          </li>
        </BlogList>
        <BlogParagraph>
          Concerns #1 and #2 are represented on this page right now. By clicking
          through the links of this blog, you can see that every page has
          it&apos;s own unique set of theme variables, such as background and
          font colors. Variables optionally override the default app theme.
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
          component which uses React Context to pass it&apos;s theme variables
          to any of it&apos;s child components.
        </BlogParagraph>
        <BlogParagraph>
          In a Next.js app, it&apos;s easy to apply this{' '}
          <BlogCodeInline>{`<ThemeProvider />`}</BlogCodeInline> to all pages by
          wrapping <BlogCodeInline>{`<Component />`}</BlogCodeInline> in{' '}
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
          Since all pages are now descendants of{' '}
          <BlogCodeInline>{`<ThemeProvider />`}</BlogCodeInline>, any component
          of these pages has easy access to{' '}
          <BlogCodeInline>fontColor</BlogCodeInline> and{' '}
          <BlogCodeInline>backgroundColor</BlogCodeInline>.
        </BlogParagraph>
        <BlogCodeBlock
          language="jsx"
          path="/pages/cool-page.js"
          code={`
import styled from 'styled-components';

const Page = () => (
  <StyledPage>
    I'm a themed page!
  </StyledPage>
);

export default Page;

const StyledPage = styled.div\`
  background-color: ${`{({ theme }) => theme.backgroundColor }`};
  color: ${`{({ theme }) => theme.fontColor }`};
\`;
        `}
        />
        <BlogQuote>
          The default app theme is cool but what about page themes?
        </BlogQuote>
        <BlogParagraph>
          In Next.js, static properties of a page can be accessed in{' '}
          <BlogCodeInline>/pages/_app.js</BlogCodeInline>. Let&apos;s add a
          static property to the <BlogCodeInline>Page</BlogCodeInline> called{' '}
          <BlogCodeInline>pageTheme</BlogCodeInline>
        </BlogParagraph>
        <BlogCodeBlock
          language="jsx"
          path="/pages/cool-page.js"
          code={`
import styled from 'styled-components';

const Page = () => (
  <StyledPage>
    I'm a themed page!
  </StyledPage>
);

Page.pageTheme = {
  backgroundColor: green;
  fontColor: purple;
};

export default Page;

const StyledPage = styled.div\`
  background-color: ${`{({ theme }) => theme.backgroundColor }`};
  color: ${`{({ theme }) => theme.fontColor }`};
\`;
        `}
        />
        <BlogParagraph>
          Then we&apos;ll merge our page theme variables into the default app
          theme.
        </BlogParagraph>
        <BlogCodeBlock
          language="jsx"
          path="/pages/_app.js"
          code={`
render() {
  const { Component, pageProps } = this.props;
  const { pageTheme } = Component;

  const theme = {
    // Default app theme
    ...appTheme,
    // Any theme variables provided by the page
    ...pageTheme
  };

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Container>
  );
}
        `}
        />
        <BlogSectionHeading id="the-dynamic-page-theme">
          The Dynamic Page Theme
        </BlogSectionHeading>
        <BlogQuote>Pfff... Light/Dark mode. I want it all!</BlogQuote>
        <BlogParagraph>
          In order to change our page theme dynamically, i.e. at the push of a
          button, we&apos;ll need to transcend our static page properties with
          actual state changes inside{' '}
          <BlogCodeInline>/pages/_app.js</BlogCodeInline>.
        </BlogParagraph>
        <BlogParagraph>
          The overall goal is to maintain state in{' '}
          <BlogCodeInline>/pages/_app.js</BlogCodeInline> with a list of pages
          and their dynamic page overrides. We&apos;ll then need to create a
          function for retrieving and updating the current page&apos;s dynamic
          theme variables. The <BlogCodeInline>updateTheme()</BlogCodeInline>{' '}
          function will be passed as a prop to our page which can be used to
          update the theme!
        </BlogParagraph>
        <BlogCodeBlock
          language="jsx"
          path="/pages/_app.js"
          code={`
/**
 * Maintain a list of dynamic theme variables for each page
 * 
 * dynamicPageThemes: [
 *    {
 *      route: '/cool-page',
 *      dynamicTheme: {
 *        backgroundColor: 'grey',
 *        fontColor: 'blue'
 *      }
 *    }
 * ]
 */
state = {
  dynamicPageThemes: []
};

/**
 * Updates the current page's theme with provided variables
 *
 * @param dynamicTheme object
 */
updateTheme = dynamicTheme => {
  // Get the current page route i.e. /cool-page
  const { route } = this.props.router;
  const { dynamicPageThemes } = this.state;

  // Lookup this page in state, create or update if necessary
  const pageIndex = dynamicPageThemes.findIndex(page => page.route === route);
  if (pageIndex === -1) dynamicPageThemes.push({ route, dynamicTheme });
  else dynamicPageThemes[pageIndex] = { route, dynamicTheme };

  // Add dynamic theme vars to state
  this.setState({ dynamicPageThemes });
};

/**
 * Retrieves any dynamic theme vars for current page
 *
 * @returns object
 */
getDynamicPageTheme = () => {
  // Get the current page route i.e. /cool-page
  const { route } = this.props.router;
  const { dynamicPageThemes } = this.state;

  // Lookup this page in state if it exists
  const dynamicPageTheme = dynamicPageThemes.find(
    pageTheme => pageTheme.route === route
  );

  // Return any dynamic theme variables for the current page route
  return dynamicPageTheme ? dynamicPageTheme.dynamicTheme : {};
};

render() {
  const { Component, pageProps } = this.props;
  const { pageTheme } = Component;
  const dynamicTheme = this.getDynamicPageTheme();

  const theme = {
    // Default app theme
    ...appTheme,
    // Any theme variables provided by the page
    ...pageTheme,
    // Override any static page variables with dynamically set variables
    ...dynamicTheme
  };

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} updateTheme={this.updateTheme} />
      </ThemeProvider>
    </Container>
  );
}
        `}
        />
        <BlogParagraph>
          Since our theme that is passed to{' '}
          <BlogCodeInline>ThemeProvider</BlogCodeInline> is now a product of
          state changes, we can dynamically update any page by calling{' '}
          <BlogCodeInline>this.props.updateTheme()</BlogCodeInline>
        </BlogParagraph>
        <BlogCodeBlock
          language="jsx"
          path="/pages/cool-page.js"
          code={`
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Page = ({ updateTheme }) => (
  <StyledPage>
    I'm a themed page!
    <button
      type="button"
      onClick={() =>
        updateTheme({ backgroundColor: 'magenta', fontColor: 'grey' })
      }
    >
      Grey Theme
    </button>
  </StyledPage>
);

Page.pageTheme = {
  backgroundColor: green;
  fontColor: purple;
};

BlogPage.propTypes = {
  updateTheme: PropTypes.func.isRequired
};

export default Page;

const StyledPage = styled.div\`
  background-color: ${`{({ theme }) => theme.backgroundColor }`};
  color: ${`{({ theme }) => theme.fontColor }`};
\`;
        `}
        />
        <BlogSectionHeading id="the-random-button">
          The Random Button
        </BlogSectionHeading>
        <BlogParagraph>
          There is a treasure trove of cool color palettes over at{' '}
          <BlogLink href="https://www.colourlovers.com/palettes" paragraph>
            colourlovers.com
          </BlogLink>
          .
        </BlogParagraph>
        <BlogQuote>
          Most of these palettes, minimally the top hundred, will look great in
          a page theme, right?
        </BlogQuote>
        <BlogParagraph>
          Conveniently, there is a library for exactly this purpose on npm!
        </BlogParagraph>
        <BlogParagraph>
          In order to automatically generate a complete page theme from random
          color palettes, there is only one hardfast rule: The contrast of the
          text to background must be high enough that the page is legible.
        </BlogParagraph>
        <BlogQuote>
          The Web Content Accessibility Guidelines (WCAG) suggest several
          minimum contrast ratios of font color to background color. I&apos;ll
          settle for minimum contrast of 4.5, as it produces some very
          interesting results.
        </BlogQuote>
        <BlogParagraph>The basic algorithm is:</BlogParagraph>
        <BlogList>
          <li>
            Choose a random{' '}
            <BlogLink href="https://www.colourlovers.com/palettes" paragraph>
              colourlovers.com
            </BlogLink>{' '}
            color palette
          </li>
          <li>Pick the first color in the pallete as the background color.</li>
          <li>
            Find the top two highest contrast colors in the palette against the
            background color.
          </li>
          <li>
            If these contrasts exceed our{' '}
            <BlogCodeInline>CONTRAST_THRESHOLD</BlogCodeInline>, then these
            colors will be used to update our theme.
          </li>
          <li>
            If these contrasts DO NOT exceed our{' '}
            <BlogCodeInline>CONTRAST_THRESHOLD</BlogCodeInline>, set the next
            color in the palette as our background color and try again.
          </li>
          <li>
            If we&apos;ve gone through our entire color palette and still
            haven&apos;t found a suitable combination to meet our{' '}
            <BlogCodeInline>CONTRAST_THRESHOLD</BlogCodeInline>, pick a new
            random palette and try again until we&apos;ve found something
            decent.
          </li>
        </BlogList>
        <BlogCodeBlock
          language="jsx"
          path="/pages/cool-page.js"
          code={`
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
  const CONTRAST_THRESHOLD = 4.5;

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

  return {
    fontColor,
    highlightFontColor,
    backgroundColor
  };
};
          `}
        />
        <BlogParagraph>
          Useage is as simple as calling{' '}
          <BlogCodeInline>generateColorPalette()</BlogCodeInline> and passing
          it&apos;s result to <BlogCodeInline>updateTheme()</BlogCodeInline>.
        </BlogParagraph>
        <BlogCodeBlock
          language="jsx"
          path="/pages/cool-page.js"
          code={`
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Page = ({ updateTheme }) => (
  <StyledPage>
    I'm a themed page!
    <button
      type="button"
      onClick={() => updateTheme(generateColorPalette())}
    >
      Grey Theme
    </button>
  </StyledPage>
);

Page.pageTheme = {
  backgroundColor: green;
  fontColor: purple;
};

BlogPage.propTypes = {
  updateTheme: PropTypes.func.isRequired
};

export default Page;

const StyledPage = styled.div\`
  background-color: ${`{({ theme }) => theme.backgroundColor }`};
  color: ${`{({ theme }) => theme.fontColor }`};
\`;    
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
  backgroundColor: '#019800'
});

// Get absolute url of page
BlogPage.getInitialProps = async ({ req }) => {
  const hostname = req ? req.headers.host : window.location.hostname;
  const protocol = hostname.includes('localhost') ? 'http' : 'https';

  return { baseUrl: `${protocol}/${hostname}` };
};

export default BlogPage;

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

const TableOfContents = styled.div`
  display: flex;
  flex-direction: column;
  > :not(:last-child) {
    margin-bottom: 0.3em;
  }
  > a {
    margin-left: 20px;
  }
`;
