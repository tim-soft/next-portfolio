import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { BlogArticleContainer, BlogSEO } from 'components/Blog';
import { generatePageTheme } from 'components/AppTheme';
import Button from 'components/Button';

const BlogPage = ({ baseUrl, theme, updateTheme }) => (
  <>
    <BlogSEO baseUrl={baseUrl} />
    <ThemeProvider theme={theme}>
      <BlogArticleContainer>
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
          <Button onClick={() => updateTheme({})}>Reset</Button>
        </ToggleThemeContainer>
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

// Get absolute url of page
BlogPage.getInitialProps = async ({ req }) => {
  const hostname = req ? req.headers.host : window.location.hostname;
  const protocol = hostname.includes('localhost') ? 'http' : 'https';
  const theme = generatePageTheme({
    fontColor: 'black',
    highlightFontColor: 'springgreen',
    backgroundColor: '#008000'
  });

  return { baseUrl: `${protocol}/${hostname}`, theme };
};

export default BlogPage;

const ToggleThemeContainer = styled.div`
  margin: 2em 0;
  display: flex;
  > * {
    margin: 0 auto;
  }
`;
