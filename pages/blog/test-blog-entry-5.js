import React from 'react';
import NextSEO, { BlogJsonLd } from 'next-seo';
import {
  BlogParagraph,
  BlogCodeBlock,
  BlogCodeSandboxEmbed,
  BlogArticleContainer
} from 'components/Blog';

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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae
        justo eget magna fermentum iaculis. Tristique senectus et netus et
        malesuada fames ac turpis egestas. Elit eget gravida cum sociis natoque
        penatibus et magnis dis. Faucibus a pellentesque sit amet porttitor eget
        dolor morbi. Elementum sagittis vitae et leo duis ut. Scelerisque eu
        ultrices vitae auctor.
      </BlogParagraph>
      <BlogCodeBlock
        language="graphql"
        code={`
query {
  superCoolGraphQLQuery({ number: 5 }) {
    id
    name
    date
  }
}
      `}
      />
      <BlogCodeBlock
        language="jsx"
        code={`
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';

const BlogCodeBlock = ({ code, language }) => (
  <Highlight
    {...defaultProps}
    theme={theme}
    code={code.trim()}
    language={language}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <Pre className={className} style={style}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            <LineNumber>{i + 1}</LineNumber>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </Pre>
    )}
  </Highlight>
);

BlogCodeBlock.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string
};

BlogCodeBlock.defaultProps = {
  language: 'jsx'
};

export default BlogCodeBlock;
      `}
      />
      <BlogParagraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae
        justo eget magna fermentum iaculis. Tristique senectus et netus et
        malesuada fames ac turpis egestas. Elit eget gravida cum sociis natoque
        penatibus et magnis dis. Faucibus a pellentesque sit amet porttitor eget
        dolor morbi. Elementum sagittis vitae et leo duis ut. Scelerisque eu
        ultrices vitae auctor.
      </BlogParagraph>
      <BlogCodeSandboxEmbed
        src="https://codesandbox.io/embed/308zj3k7l1?autoresize=1&fontsize=14&view=preview"
        title="3D Snowfall"
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      />
      <BlogParagraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae
        justo eget magna fermentum iaculis. Tristique senectus et netus et
        malesuada fames ac turpis egestas. Elit eget gravida cum sociis natoque
        penatibus et magnis dis. Faucibus a pellentesque sit amet porttitor eget
        dolor morbi. Elementum sagittis vitae et leo duis ut. Scelerisque eu
        ultrices vitae auctor.
      </BlogParagraph>
      <BlogParagraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae
        justo eget magna fermentum iaculis. Tristique senectus et netus et
        malesuada fames ac turpis egestas. Elit eget gravida cum sociis natoque
        penatibus et magnis dis. Faucibus a pellentesque sit amet porttitor eget
        dolor morbi. Elementum sagittis vitae et leo duis ut. Scelerisque eu
        ultrices vitae auctor.
      </BlogParagraph>
      <BlogParagraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae
        justo eget magna fermentum iaculis. Tristique senectus et netus et
        malesuada fames ac turpis egestas. Elit eget gravida cum sociis natoque
        penatibus et magnis dis. Faucibus a pellentesque sit amet porttitor eget
        dolor morbi. Elementum sagittis vitae et leo duis ut. Scelerisque eu
        ultrices vitae auctor.
      </BlogParagraph>
    </BlogArticleContainer>
  </>
);

const fontColor = '#31d7f9';
const highlightFontColor = 'springgreen';
const backgroundColor = '#3b3f45';

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

export default BlogPage;
