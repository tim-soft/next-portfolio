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
        <h2>[Under Construction]</h2>
      </section>
      <section>
        <BlogCodeBlock
          path="Terminal"
          language="bash"
          code="yarn add react-particles-webgl three"
        />
        <BlogCodeBlock
          path="/components/Particles.js"
          language="jsx"
          code={`
import React from 'react';
import ParticleField from 'react-particles-webgl';

/**
 * The default configuation for the ParticleField component
 *
 * Any option passed in via props will overwrite the default config
 */
const config = {
 
};

export default () => <ParticleField config={config} />;
      `}
        />
      </section>
      <section>
        <h2>Test 2</h2>
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
