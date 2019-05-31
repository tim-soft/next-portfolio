import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';
import Scrollbar from 'react-scrollbars-custom';

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
