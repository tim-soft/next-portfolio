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
          Test{` `}
          <BlogLink
            href="https://www.npmjs.com/package/stringify-object"
            paragraph
          >
            stringify-object
          </BlogLink>
        </BlogParagraph>

        <BlogCodeBlock
          language="js"
          path="/data/config.js"
          code={`
  const config = {
    showCube: true,
    dimension: '3D',
    velocity: 2,
    boundaryType: 'bounce',
    antialias: true,
    particles: {
      colorMode: 'rainbow',
      color: '#3FB568',
      transparency: 0.9,
      shape: 'square',
      boundingBox: 'canvas',
      count: 500,
      minSize: 10,
      maxSize: 75,
      visible: true
    }
  }
        `}
        />

        <BlogCodeBlock
          language="js"
          path="/data/config.js"
          code={`
  const configJSON = JSON.stringify(config, null, 2);

  console.log(configJSON)
        `}
        />

        <BlogCodeBlock
          language="json"
          path="/data/config.json"
          showLineNumbers={false}
          code={`
  {
    "showCube": true,
    "dimension": "3D",
    "velocity": 2,
    "boundaryType": "bounce",
    "antialias": true,
    "particles": {
        "colorMode": "rainbow",
        "color": "#3FB568",
        "transparency": 0.9,
        "shape": "square",
        "boundingBox": "canvas",
        "count": 500,
        "minSize": 10,
        "maxSize": 75,
        "visible": true
    }
  }
          `}
        />

        <BlogCodeBlock
          language="js"
          path="/data/config.js"
          code={`
  import stringifyObject from 'stringify-object';

  const config = {
    showCube: true,
    dimension: '3D',
    velocity: 2,
    boundaryType: 'bounce',
    antialias: true,
    particles: {
      colorMode: 'rainbow',
      color: '#3FB568',
      transparency: 0.9,
      shape: 'square',
      boundingBox: 'canvas',
      count: 500,
      minSize: 10,
      maxSize: 75,
      visible: true
    }
  }

  console.log(stringifyObject(config, {
    indent: '  ',
    singleQuotes: true
  }))
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

// Get URL and generate page theme
BlogPage.getInitialProps = async ({ req }) => {
  const hostname = req ? req.headers.host : window.location.hostname;
  const protocol = hostname.includes('localhost') ? 'http' : 'https';
  const theme = generatePageTheme({
    fontColor: '#31d7f9',
    highlightFontColor: 'springgreen',
    backgroundColor: '#202629'
  });

  return { baseUrl: `${protocol}/${hostname}`, theme };
};

export default BlogPage;
