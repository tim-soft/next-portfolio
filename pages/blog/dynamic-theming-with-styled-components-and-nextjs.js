import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import {
  BlogArticleContainer,
  BlogSEO,
  BlogParagraph,
  BlogList,
  BlogSectionHeading
} from 'components/Blog';
import { generatePageTheme } from 'components/AppTheme';
import Button from 'components/Button';

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
        <ToggleThemeContainer>
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
