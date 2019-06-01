import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';
import Scrollbar from 'react-scrollbars-custom';

/**
 * Splits first token of line at any leading whitespace
 *
 * The purpose of the split is to solve the problem of the leading
 * whitespace getting highlighted on hover
 *
 * @param {array} line Tokenized line of code
 */
const splitLineIndent = line => {
  const { content } = line[0];
  const hasIndent = content.charAt(0) === ' ';

  // If the first token of line has a leading space, it'll need to be split
  if (content && hasIndent) {
    // Get leading whitespace
    const lineIndent = content.split(/^(\s+)/)[1];
    // Get the code portion of token
    const codeStart = content.split(/^(\s+)/)[2];

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

const BlogCodeBlock = ({ code, language }) => (
  <StyledScrollbar
    translateContentSizesToHolder
    noScrollY
    trackXProps={{
      renderer: props => {
        // eslint-disable-next-line react/prop-types
        const { elementRef, style, ...restProps } = props;

        return (
          <span
            {...restProps}
            style={{
              ...style,
              background: '#9E9E9E',
              height: '11px',
              width: '100%',
              left: 0
            }}
            ref={elementRef}
          />
        );
      }
    }}
  >
    <Highlight
      {...defaultProps}
      theme={theme}
      code={code.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => {
            splitLineIndent(line);

            return (
              <div {...getLineProps({ line, key: i })}>
                <LineNumber>{i + 1}</LineNumber>
                {line.map((token, key) => {
                  const props = getTokenProps({ token, key });

                  // if first span is empty, add empty classname
                  // eslint-disable-next-line react/prop-types
                  if (key === 0 && !/\S/.test(props.children)) {
                    props.className += ' whitespace';
                  }

                  return <span {...props} />;
                })}
              </div>
            );
          })}
        </Pre>
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
  language: PropTypes.string
};

BlogCodeBlock.defaultProps = {
  language: 'jsx'
};

export default BlogCodeBlock;

const StyledScrollbar = styled(Scrollbar)`
  max-width: calc(100vw - 40px);
  margin: 2em 0;
`;

const Pre = styled.pre`
  width: 700px;
  text-align: left;
  margin: 0;
  padding: 1em;
  font-size: 1.05em;
  cursor: text;

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
    :hover {
      border-top: 2px #0e8a13 dotted;
      border-bottom: 2px #0e8a13 dotted;
      & .token:not(.whitespace) {
        background: darkmagenta;
      }
    }
    * ::selection {
      background: #0e8a13;
    }
  }
`;

const LineNumber = styled.span`
  display: inline-block;
  width: 2em;
  user-select: none;
  opacity: 0.5;
`;
