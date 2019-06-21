import React from 'react';
import PropTypes from 'prop-types';
import {
  BlogParagraph,
  BlogLink,
  BlogCodeBlock,
  BlogArticleContainer,
  BlogSEO
} from 'components/Blog';

const BlogPage = ({ baseUrl }) => (
  <>
    <BlogSEO baseUrl={baseUrl} />
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
  </>
);

const fontColor = '#31d7f9';
const highlightFontColor = 'springgreen';
const backgroundColor = '#202629';

// _app.js level theme variable overrides
BlogPage.theme = {
  headerNavFontColor: fontColor,
  headerNavTextUnderlineColor: highlightFontColor,
  headerNavHoverFontColor: highlightFontColor,
  headerNavHamburgerIconColor: fontColor,
  pageBackgroundColor: backgroundColor,
  pageContentFontColor: fontColor,
  pageContentLinkHoverColor: highlightFontColor,
  blogArticleWidth: 740
};

BlogPage.propTypes = {
  baseUrl: PropTypes.string.isRequired
};

// Get absolute url of page
BlogPage.getInitialProps = async ({ req }) => {
  const hostname = req ? req.headers.host : window.location.hostname;
  const protocol = hostname.includes('localhost') ? 'http' : 'https';
  return { baseUrl: `${protocol}/${hostname}` };
};

export default BlogPage;
