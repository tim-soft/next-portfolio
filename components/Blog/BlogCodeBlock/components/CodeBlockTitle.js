import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GoTriangleRight } from 'react-icons/go';

const CodeBlockTitle = ({ title, path }) => (
  <>
    {title && (
      <CodeTitleContainer>
        <CodeTitle>
          <span>{title}</span>
        </CodeTitle>
      </CodeTitleContainer>
    )}
    {path && (
      <CodeTitleContainer>
        <CodeTitle>
          {path
            // remove leading/trailing slashes
            .replace(/^[/]*(.*?)[/]*$/g, '$1')
            // Split string into array of tokens, including forward slash delimiter
            .split(/(\/)/g)
            .map((token, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <span key={`${token}-${i}`}>
                {token === '/' ? <RightTriangleIcon size="0.60em" /> : token}
              </span>
            ))}
        </CodeTitle>
      </CodeTitleContainer>
    )}
  </>
);

CodeBlockTitle.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  path: PropTypes.string
};

CodeBlockTitle.defaultProps = {
  title: null,
  path: null
};

export default CodeBlockTitle;

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

const RightTriangleIcon = styled(GoTriangleRight)`
  margin: 0 8px;
`;
