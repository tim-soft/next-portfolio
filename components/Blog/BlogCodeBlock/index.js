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

const BlogCodeBlock = ({ code, language, width }) => (
  <StyledScrollbar translateContentSizesToHolder noScrollY width={width}>
    <Highlight
      {...defaultProps}
      theme={codeTheme}
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

                  // Color const + let + var tokens blue
                  if (
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
);

BlogCodeBlock.propTypes = {
  code: PropTypes.string.isRequired,
  /**
   * See here for all supported languages for syntax highlighting
   * https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js
   */
  language: PropTypes.string,
  width: PropTypes.number
};

BlogCodeBlock.defaultProps = {
  language: 'jsx',
  width: null
};

export default BlogCodeBlock;

const StyledScrollbar = styled(Scrollbar)`
  max-width: calc(100vw - 40px);
  width: ${({ theme, width }) => width || theme.blogArticleWidth}px !important;
  margin: 2em auto;
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
  transition: padding 0.1s ease;
  :hover {
    padding: 2px 0;
    ${LineNumber} {
      color: white;
      opacity: 1;
    }
    border-top: 2px #0e8a13 dotted;
    border-bottom: 2px #0e8a13 dotted;
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
  width: 100%;
  min-width: calc(
    ${({ theme, width }) => width || theme.blogArticleWidth}px - 4em - 1px
  );
  text-align: left;
  margin: 0;
  padding: 1em;
  font-size: 1.05em;
  cursor: text;
`;
