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
        <p>
          Adding react-particles-webgl to your project is easy, Three.js is
          required so add it if your project doesn&apos;t have it already.
        </p>
        <BlogCodeBlock
          path="Terminal"
          language="bash"
          code="yarn add react-particles-webgl three"
        />
      </section>
      <section>
        <h2>Basic Usage</h2>
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
