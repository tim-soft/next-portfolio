import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Highlight from 'react-highlight';

/**
 * A code viewer which pretty prints the current ParticleField config
 *
 * @param {object} datConfig The current configuration of the ParticleField
 */
const ConfigViewer = ({ datConfig }) => (
  <ConfigContainer>
    <HighlightStyles>
      <Highlight className="javascript">
        {`
/**
 * Tim Ellenberger
 * https://github.com/tim-soft
 */

${JSON.stringify(datConfig, undefined, 2)}
        `}
      </Highlight>
    </HighlightStyles>
  </ConfigContainer>
);

ConfigViewer.propTypes = {
  datConfig: PropTypes.object.isRequired
};

export default ConfigViewer;

const ConfigContainer = styled.div`
  position: absolute;
  background: #1a1a1ad4;
  min-height: 900px;
  color: white;
  width: 352px;
  padding: 10px;
  height: 100%;
  user-select: text;
`;

const HighlightStyles = styled.div`
  height: 100%;
  width: 100%;
  margin: 0;
  > pre {
    height: 100%;
    margin: 0;
    > code {
      height: 100% !important;
      padding: 0 !important;
      height: 100% !important;
      background: inherit !important;
    }
  }
  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    background: #232323;
    color: #e6e1dc;
  }
  .hljs-comment,
  .hljs-quote {
    color: #bc9458;
    font-style: italic;
  }
  .hljs-keyword,
  .hljs-selector-tag {
    color: #c26230;
  }
  .hljs-string,
  .hljs-number,
  .hljs-regexp,
  .hljs-variable,
  .hljs-template-variable {
    color: #a5c261;
  }
  .hljs-subst {
    color: #519f50;
  }
  .hljs-tag,
  .hljs-name {
    color: #e8bf6a;
  }
  .hljs-type {
    color: #da4939;
  }
  .hljs-symbol,
  .hljs-bullet,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-attr,
  .hljs-link {
    color: #6d9cbe;
  }
  .hljs-params {
    color: #d0d0ff;
  }
  .hljs-attribute {
    color: #cda869;
  }
  .hljs-meta {
    color: #9b859d;
  }
  .hljs-title,
  .hljs-section {
    color: #ffc66d;
  }
  .hljs-addition {
    background-color: #144212;
    color: #e6e1dc;
    display: inline-block;
    width: 100%;
  }
  .hljs-deletion {
    background-color: #600;
    color: #e6e1dc;
    display: inline-block;
    width: 100%;
  }
  .hljs-selector-class {
    color: #9b703f;
  }
  .hljs-selector-id {
    color: #8b98ab;
  }
  .hljs-emphasis {
    font-style: italic;
  }
  .hljs-strong {
    font-weight: bold;
  }
  .hljs-link {
    text-decoration: underline;
  }
`;
