import React from 'react';
import NextSEO, { BlogJsonLd } from 'next-seo';
import dynamic from 'next/dynamic';
import { BlogParagraph, BlogLink, BlogArticleContainer } from 'components/Blog';

const BlogCodeBlock = dynamic(() => import('components/Blog/BlogCodeBlock'));

const BlogPage = () => (
  <>
    <NextSEO
      config={{
        title: 'Coding, Musings and Adventures of Tim Ellenberger',
        openGraph: {
          title: 'Coding, Musings and Adventures of Tim Ellenberger'
        }
      }}
    />
    <BlogJsonLd
      url="https://timellenberger.now.sh/blog"
      title="Coding, Musings and Adventures of Tim Ellenberger"
      images={['https://timellenberger.now.sh/static/avatar.png']}
      datePublished="2019-03-31T08:00:00+08:00"
      dateModified="2019-03-31T09:00:00+08:00"
      authorName="Tim Ellenberger"
      description="Coding, Musings and Adventures of Tim Ellenberger"
    />
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

export default BlogPage;
