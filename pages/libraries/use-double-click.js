import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import LibraryLayout from 'layouts/LibraryLayout';
import { darkTheme } from 'components/AppTheme';
import { BlogCodeBlock } from 'components/Blog';

const LibraryPage = ({ route, theme }) => (
  <ThemeProvider theme={theme}>
    <LibraryLayout route={route}>
      <section>
        <h2>Installation</h2>
        <BlogCodeBlock
          path="Terminal"
          language="bash"
          code="yarn add use-double-click"
        />
      </section>
      <section>
        <h2>Basic Usage</h2>
        <BlogCodeBlock
          path="/components/Clicker.js"
          language="jsx"
          code={`
import { useRef } from 'react';
import useDoubleClick from 'use-double-click';

const Button = () => {
  const buttonRef = useRef();
  
  useDoubleClick({
    onSingleClick: e => {
      console.log(e, 'single click');
    },
    onDoubleClick: e => {
      console.log(e, 'double click');
    },
    ref: buttonRef,
    latency: 250
  });
  
  return <button ref={buttonRef}>Click Me</button>
}
      `}
        />
      </section>
    </LibraryLayout>
  </ThemeProvider>
);

LibraryPage.propTypes = {
  route: PropTypes.string.isRequired,
  theme: PropTypes.object
};

LibraryPage.defaultProps = {
  theme: {}
};

LibraryPage.pageTheme = darkTheme;

export default LibraryPage;
