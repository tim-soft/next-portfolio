import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Highlight, { defaultProps } from 'prism-react-renderer';
import Scrollbar from 'components/Scrollbar';
import codeTheme from './vsDarkPlusTheme';

/**
 * Splits the first token of a code line at any leading whitespace
 *
 * The purpose of the split is to easily highlight code on hover without
 * including the indenting whitespace
 *
 * So if the beginning of a line looks like this exists:
 *    <span>{`      <div />`}</span>
 * break into two parts:
 *    <span>{`      `}</span>
 *    <span>{`<div />`}</span>
 *
 * @param {array} line Tokenized line of code
 */
const splitLineIndent = line => {
  const { content } = line[0];
  const hasIndent = content.charAt(0) === ' ';

  // If the first token of line has a leading space, it'll need to be split
  if (hasIndent) {
    // Separate leading whitespace and code portion of token
    const [, lineIndent, codeStart] = content.split(/^(\s+)/);

    // If token isn't only whitespace, insert split tokens back into line
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

const BlogCodeBlock = ({ code, language, theme, width }) => (
  <CodeBlockContainer width={width}>
    <CodeTitleContainer>
      <CodeTitle>components &#x2023; Blog &#x2023; BlogCodeBlock.js</CodeTitle>
    </CodeTitleContainer>
    <StyledScrollbar translateContentSizesToHolder noScrollY width={width}>
      <Highlight
        {...defaultProps}
        theme={theme || codeTheme}
        code={code.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <CodeBlock className={className} style={style} width={width}>
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
                    if (key === 0 && !/\S/.test(props.children)) {
                      props.className += ' whitespace';
                    }

                    // Color const + let + var tokens blue when using default dark theme
                    if (
                      !theme &&
                      props.children === ('const' || 'let' || 'var') &&
                      // eslint-disable-next-line react/prop-types
                      props.className === 'token keyword'
                    ) {
                      props.className += ' js-darkblue';
                    }

                    return <span {...props} />;
                  })}
                </BlockLine>
              );
            })}
          </CodeBlock>
        )}
      </Highlight>
    </StyledScrollbar>
  </CodeBlockContainer>
);

BlogCodeBlock.propTypes = {
  code: PropTypes.string.isRequired,
  /**
   * See here for all supported languages for syntax highlighting
   * https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js
   */
  language: PropTypes.string,
  width: PropTypes.number,
  theme: PropTypes.object
};

BlogCodeBlock.defaultProps = {
  language: 'jsx',
  width: null,
  theme: null
};

export default BlogCodeBlock;

const CodeBlockContainer = styled.div`
  margin: 2em auto;
  width: 100%;
  max-width: ${({ theme, width }) =>
    width || theme.blogArticleWidth}px !important;
`;

const CodeTitle = styled.h2`
  margin: 1em;
  font-weight: normal;
  font-size: 1.3em;
  font-family: monospace;
  color: ${({ theme }) => theme.pageContentLinkHoverColor};
`;

const CodeTitleContainer = styled.div`
  background-color: rgb(30, 30, 30);
  width: 100%;
  display: flex;
  border-bottom: 1px ${({ theme }) => theme.pageContentLinkHoverColor} solid;
  margin: auto;
`;

const StyledScrollbar = styled(Scrollbar)`
  width: 100% !important;
  margin: 0 auto;
`;

const LineNumber = styled.span`
  display: inline-block;
  width: 2em;
  user-select: none;
  opacity: 0.5;
`;

const BlockLine = styled.div`
  line-height: 1.3em;
  height: 1.3em;
  transition: padding 0.1s ease-in-out;
  :hover {
    padding: 4px 0;
    ${LineNumber} {
      color: white;
      opacity: 1;
    }
    border-top: 1px ${({ theme }) => theme.pageContentLinkHoverColor} dotted;
    border-bottom: 1px ${({ theme }) => theme.pageContentLinkHoverColor} dotted;
    .token:not(.whitespace) {
      background: darkmagenta;
    }
  }
  * ::selection {
    background: #0e8a13;
  }
  /* Update punctuation colors not accessible through prism theme */
  span.token.tag.spread.punctuation,
  span.token.tag.script.punctuation,
  .js-darkblue {
    color: rgb(86, 156, 214) !important;
  }
  span.token.tag.punctuation {
    color: rgb(128, 128, 128) !important;
  }
`;

const CodeBlock = styled.pre`
  min-width: ${({ width, theme }) => {
    if (width) return `calc(${width}px - 2em)`;

    return `calc(${theme.blogArticleWidth}px - 2em)`;
  }};
  width: ${({ width }) => {
    if (width) return `calc(${width}px - 2em)`;

    return `calc(100% - 2em)`;
  }};
  text-align: left;
  margin: 0;
  padding: 1em;
  font-size: 1.05em;
  cursor: text;
`;
