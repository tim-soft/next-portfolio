import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import {
  BlogParagraph,
  BlogCodeBlock,
  BlogCodeSandboxEmbed,
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu sem
          integer vitae justo eget magna fermentum iaculis. Tristique senectus
          et netus et malesuada fames ac turpis egestas. Elit eget gravida cum
          sociis natoque penatibus et magnis dis. Faucibus a pellentesque sit
          amet porttitor eget dolor morbi. Elementum sagittis vitae et leo duis
          ut. Scelerisque eu ultrices vitae auctor.
        </BlogParagraph>
        <BlogCodeBlock
          code={`
import React from 'react';

const SomeComponent = () => <div />;

export default SomeComponent;
      `}
        />
        <BlogParagraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu sem
          integer vitae justo eget magna fermentum iaculis. Tristique senectus
          et netus et malesuada fames ac turpis egestas. Elit eget gravida cum
          sociis natoque penatibus et magnis dis. Faucibus a pellentesque sit
          amet porttitor eget dolor morbi. Elementum sagittis vitae et leo duis
          ut. Scelerisque eu ultrices vitae auctor.
        </BlogParagraph>
        <BlogCodeSandboxEmbed
          src="https://codesandbox.io/embed/308zj3k7l1?autoresize=1&fontsize=14&view=preview"
          title="3D Snowfall"
          sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
        />
        <BlogParagraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu sem
          integer vitae justo eget magna fermentum iaculis. Tristique senectus
          et netus et malesuada fames ac turpis egestas. Elit eget gravida cum
          sociis natoque penatibus et magnis dis. Faucibus a pellentesque sit
          amet porttitor eget dolor morbi. Elementum sagittis vitae et leo duis
          ut. Scelerisque eu ultrices vitae auctor.
        </BlogParagraph>
        <BlogParagraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu sem
          integer vitae justo eget magna fermentum iaculis. Tristique senectus
          et netus et malesuada fames ac turpis egestas. Elit eget gravida cum
          sociis natoque penatibus et magnis dis. Faucibus a pellentesque sit
          amet porttitor eget dolor morbi. Elementum sagittis vitae et leo duis
          ut. Scelerisque eu ultrices vitae auctor.
        </BlogParagraph>
        <BlogParagraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu sem
          integer vitae justo eget magna fermentum iaculis. Tristique senectus
          et netus et malesuada fames ac turpis egestas. Elit eget gravida cum
          sociis natoque penatibus et magnis dis. Faucibus a pellentesque sit
          amet porttitor eget dolor morbi. Elementum sagittis vitae et leo duis
          ut. Scelerisque eu ultrices vitae auctor.
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
  theme: PropTypes.object
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
