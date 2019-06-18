import React from 'react';
import NextSEO, { BlogJsonLd } from 'next-seo';
import dynamic from 'next/dynamic';
import { BlogParagraph, BlogArticleContainer, BlogLink } from 'components/Blog';

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
        Code snippets without syntax highlighting are unsightly.
      </BlogParagraph>
      <BlogParagraph>
        VS Code and its&apos; default theme Dark+ has gained a lot of
        familiarity in the development community.
      </BlogParagraph>
      <BlogParagraph>
        A project called{' '}
        <BlogLink href="https://github.com/PrismJS/prism" paragraph>
          PrismJS
        </BlogLink>{' '}
        for syntax highlighting{' '}
      </BlogParagraph>
      <BlogParagraph>
        Another project succinctly named{' '}
        <BlogLink
          href="https://github.com/FormidableLabs/prism-react-renderer"
          paragraph
        >
          prism-react-renderer
        </BlogLink>{' '}
        which enables us to manipulate the PrismJS syntax highlighted output as
        well as add extraneous react components into the code blocks. Moreover,
        a theme object may be passed as a prop to further control the syntax
        highlighting.
      </BlogParagraph>
      <BlogCodeBlock
        language="jsx"
        path="/components/Blog/BlogCodeBlock.js"
        code={`
const BlogCodeBlock = ({ code, language, theme }) => (
  <Highlight
    {...defaultProps}
    theme={theme}
    code={code.trim()}
    language={language}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <CodeBlock className={className} style={style}>
        {tokens.map((line, i) => (
          <BlockLine {...getLineProps({ line, key: i })}>
            <LineNumber>{i + 1}</LineNumber>
            {line.map((token, key) => {
              const props = getTokenProps({ token, key });

              return <span {...props} />;
            })}
          </BlockLine>
        ))}
      </CodeBlock>
    )}
  </Highlight>
);
      `}
      />
      <BlogCodeBlock
        width={550}
        path="/data/GraphQL/GetBlogCodeBlock.graphql"
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
        path="/components/Blog/BlogCodeBlock.js"
        code={`
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';

/**
 * Splits the first token of a code line at any leading whitespace
 *
 * The purpose of the split is to easily highlight code on hover
 * without including the indenting whitespace
 *
 * So if the beginning of a line looks like this exists:
 *    <span>{\`      <div />\`}</span>
 * break into two parts:
 *    <span>{\`      \`}</span>
 *    <span>{\`<div />\`}</span>
 *
 * @param {array} line Tokenized line of code
 */
const splitLineIndent = line => {
  const { content } = line[0];
  const hasIndent = content.charAt(0) === ' ';

  // Does the first token of the line have an indent?
  if (hasIndent) {
    // Separate leading whitespace and code portion of token
    const [, lineIndent, codeStart] = content.split(/^(\\s+)/);

    // If token isn't only whitespace, 
    // insert split tokens back into line
    if (codeStart !== '') {
      const newIndent = { ...line[0], content: lineIndent };
      const newCodeStart = { ...line[0], content: codeStart };

      // Delete first token
      line.shift();

      // Replace with two tokens
      line.unshift(newIndent, newCodeStart);
    }
  }
};

const BlogCodeBlock = ({ code, language }) => (
  <Highlight
    {...defaultProps}
    theme={theme}
    code={code.trim()}
    language={language}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <CodeBlock className={className} style={style}>
        {tokens.map((line, i) => {
          // Split left-most tokens with leading whitespace
          splitLineIndent(line);

          return (
            <BlockLine {...getLineProps({ line, key: i })}>
              <LineNumber>{i + 1}</LineNumber>
              {line.map((token, key) => {
                const props = getTokenProps({ token, key });

                // if first span is empty, add empty classname
                // eslint-disable-next-line react/prop-types
                if (key === 0 && !/\\S/.test(props.children)) {
                  props.className += ' whitespace';
                }

                return <span {...props} />;
              })}
            </BlockLine>
          );
        })}
      </CodeBlock>
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

// const fontColor = '#31d7f9';
// const highlightFontColor = 'springgreen';
// const backgroundColor = '#3b3f45';

// // _app.js level theme variable overrides
// BlogPage.theme = {
//   headerNavFontColor: fontColor,
//   headerNavTextUnderlineColor: highlightFontColor,
//   headerNavHoverFontColor: highlightFontColor,
//   headerNavHamburgerIconColor: fontColor,
//   pageBackgroundColor: backgroundColor,
//   pageContentFontColor: fontColor,
//   pageContentLinkHoverColor: highlightFontColor,
//   blogArticleWidth: 740
// };

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
  popoutMenuBorderColor: fontColor,
  blogArticleWidth: 740
};

export default BlogPage;
