import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import LibraryLayout from 'layouts/LibraryLayout';
import { darkTheme } from 'components/AppTheme';
import { BlogCodeBlock, BlogCodeInline, BlogLink } from 'components/Blog';
import {
  DefaultParticles,
  ParticlesJSClone,
  SnowfallParticles
} from 'components/Libraries/react-particles-webgl/demos';

const LibraryPage = ({ route, theme }) => (
  <ThemeProvider theme={theme}>
    <LibraryLayout route={route}>
      <section>
        <p>
          <BlogCodeInline>react-particles-webgl</BlogCodeInline> is a React
          component inspired by the popular{' '}
          <BlogLink
            href="https://github.com/VincentGarreau/particles.js/"
            paragraph
          >
            particles.js
          </BlogLink>{' '}
          library and built with{' '}
          <BlogLink
            href="https://github.com/drcmda/react-three-fiber"
            paragraph
          >
            react-three-fiber
          </BlogLink>{' '}
          to offer smooth 60FPS high-count particle fields in both two and three
          dimensions.
        </p>
        <h2>Demos</h2>
        <p>
          The particle field&apos;s configuration is extremely flexible,
          allowing you to optionally interact with the field via{' '}
          <BlogCodeInline>cameraControls</BlogCodeInline> with
          drag/touch/scrollwheel etc.
        </p>

        <DefaultParticles />
        <p>A two dimensional particle field with camera controls disabled.</p>
        <ParticlesJSClone />
        <p>
          A three dimensional particle field using a combination of the{' '}
          <BlogCodeInline>boundaryType: {`'passthru'`}</BlogCodeInline> and
          direction constraints.
        </p>
        <SnowfallParticles />
      </section>
      <section>
        <h2>Installation</h2>
        <p>
          Adding react-particles-webgl to your project is easy, Three.js is
          required so add it if your project doesn&apos;t have it already.
        </p>
        <p>This library is built with hooks and requires React {`>=`} 16.8.0</p>
        <BlogCodeBlock
          path="Terminal"
          language="bash"
          code="yarn add react-particles-webgl three"
        />
      </section>
      <section>
        <h2>Basic Usage</h2>
        <p>
          <BlogCodeInline>{`<ParticleField />`}</BlogCodeInline> will grow to
          fit the size of it&apos;s container, making it simple to integrate
          into any application.
        </p>
        <BlogCodeBlock
          path="/components/Particles.js"
          language="jsx"
          code={`
import React from 'react';
import ParticleField from 'react-particles-webgl';

export default () => (
  <div style={{ height: "100vh", width: "100%" }}>
    <ParticleField />
  </div>
);
      `}
        />
      </section>
      <section>
        <h2>Configuration</h2>
        <p>
          The <BlogCodeInline>{`<ParticleField />`}</BlogCodeInline> component
          accepts an optional <BlogCodeInline>config</BlogCodeInline> prop with
          an extensive list of options such as particle color, enabling camera
          controls and 2D or 3D mode.
        </p>
        <p>
          Checkout the{' '}
          <BlogLink href="/particles" paragraph>
            configurator tool
          </BlogLink>{' '}
          to test several presets and options. Below is the full list of config
          options.
        </p>
        <BlogCodeBlock
          width={860}
          path="/components/ParticleConfig.js"
          language="js"
          code={`
export default {
  // Display reference cube, useful for orienting the field
  showCube: true,
  // '2D' or '3D' particle field
  dimension: '3D',
  // 'bounce' or 'passthru'
  // 'bounce' will make particles behave like balls thrown at a wall when hitting canvas boundaries
  // 'passthru' particles will disappear after hitting canvas boundaries and be added back into the scene elsewhere
  boundaryType: 'bounce',
  // Maximum velocity of particles
  velocity: 2,
  // Toggles antialiasing -- must be set during construction, cannot be changed after initial render
  // Slight performance optimization to set false, although lines will appear more jagged
  antialias: false,
  // Min/Max multipliers which constraint how particles move in each direction
  // The default values here allow for particles to move in completely random x, y, z directions
  // See the "Snowfall" preset for an example of how to use these values
  direction: {
    xMin: -1,
    xMax: 1,
    yMin: -1,
    yMax: 1,
    zMin: -1,
    zMax: 1
  },
  lines: {
    // 'rainbow' or 'solid' color of lines
    colorMode: 'rainbow',
    // Color of lines if colorMode: 'solid', must be hex color
    color: '#351CCB',
    // Transparency of lines
    transparency: 0.9,
    // true/false limit the maximum number of line connections per particle
    limitConnections: true,
    maxConnections: 20,
    // Minimum distance needed to draw line between to particles
    minDistance: 150,
    // true/false render lines
    visible: true
  },
  particles: {
    // 'rainbow' or 'solid' color of particles
    colorMode: 'rainbow',
    // Color of lines if colorMode: 'solid', must be hex color
    color: '#3FB568',
    // Transparency of particles
    transparency: 0.9,
    // 'square' or 'circle' shape of particles
    shape: 'square',
    // The exact number of particles to render
    count: 500,
    // The minimum particle size
    minSize: 10,
    // The maximum particle size
    maxSize: 75,
    // true/false render particles
    visible: true
  },
  /*
    * The camera rig is comprised of Three.js OrbitControls
    * Pass any valid OrbitControls properties, consult docs for more info
    *
    * https://threejs.org/docs/#examples/controls/OrbitControls
    */
  cameraControls: {
    // Enable or disable all camera interaction (click, drag, touch etc)
    enabled: true,
    // Enable or disable smooth dampening of camera movement
    enableDamping: true,
    dampingFactor: 0.2,
    // Enable or disable zooming in/out of camera
    enableZoom: true,
    // Enable or disable constant rotation of camera around scene
    autoRotate: true,
    // Rotation speed -- higher is faster
    autoRotateSpeed: 0.3,
    // If true, camera position will be reset whenever any option changes (including this one)
    // Useful when turning off autoRotate, the camera will return to FOV where scene fits to canvas
    resetCameraFlag: false
  }
};
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
