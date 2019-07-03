import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Highlight, { defaultProps } from 'prism-react-renderer';
import Scrollbar from 'components/Scrollbar';
import defaultTheme from './utils/vsDarkPlusTheme';
import splitLineIndent from './utils/splitLineIndent';
import CodeBlockTitle from './components/CodeBlockTitle';

const BlogCodeBlock = ({
  code,
  language,
  theme,
  width,
  title,
  path,
  showLineNumbers
}) => (
  <CodeBlockContainer width={width}>
    <CodeBlockTitle title={title} path={path} language={language} />
    <StyledScrollbar translateContentSizesToHolder noScrollY>
      <Highlight
        {...defaultProps}
        theme={theme || defaultTheme}
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
                  {showLineNumbers && <LineNumber>{i + 1}</LineNumber>}
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

                    return <Token {...props} />;
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
  theme: PropTypes.object,
  title: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  path: PropTypes.string,
  showLineNumbers: PropTypes.bool
};

BlogCodeBlock.defaultProps = {
  language: 'jsx',
  width: null,
  theme: null,
  title: null,
  path: null,
  showLineNumbers: true
};

export default BlogCodeBlock;

const CodeBlockContainer = styled.div`
  margin: 2em auto;
  width: 100%;
  max-width: ${({ theme, width }) =>
    width || theme.pageContentWidth}px !important;
  overflow: hidden;
  border-radius: 4px;
`;

const StyledScrollbar = styled(Scrollbar)`
  width: 100% !important;
  margin: 0 auto;
  .ScrollbarsCustom-Wrapper {
    display: contents;
  }
  .ScrollbarsCustom-Scroller {
    position: relative !important;
  }
`;

const LineNumber = styled.span`
  display: inline-block;
  width: 2em;
  user-select: none;
  opacity: 0.6;
`;

const Token = styled.span`
  transition: unset;
`;

const BlockLine = styled.div`
  line-height: 1.3em;
  transition: padding 100ms ease-in-out;
  :hover {
    padding: 4px 0;
    border-top: 1px ${({ theme }) => theme.pageContentLinkHoverColor} dotted;
    border-bottom: 1px ${({ theme }) => theme.pageContentLinkHoverColor} dotted;
    ${LineNumber} {
      color: white;
      opacity: 1;
    }
    ${Token} {
      :not(.whitespace) {
        background-color: darkmagenta;
      }
    }
  }
  * ::selection {
    background: ${({ theme }) => theme.pageBackgroundColor};
  }
  /* Update punctuation colors not accessible through prism theme */
  span.token.tag.spread.punctuation,
  span.token.tag.script.punctuation,
  .js-darkblue {
    color: rgb(86, 156, 214) !important;
  }
  span.token.tag.punctuation {
    color: rgb(134, 134, 134) !important;
  }
`;

const CodeBlock = styled.pre`
  min-width: ${({ width, theme }) => {
    if (width) return `calc(${width}px - 2em)`;

    return `calc(${theme.pageContentWidth}px - 2em)`;
  }};
  width: ${({ width }) => {
    if (width) return `calc(${width}px - 2em)`;

    return `calc(100% - 2em)`;
  }};
  text-align: left;
  margin: 0;
  padding: 1em 1em 1.5em 1em;
  font-size: 1.05em;
  cursor: text;
`;
