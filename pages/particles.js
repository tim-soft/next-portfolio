import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import NextSEO from 'next-seo';
import ParticlesDemo from 'components/ParticlesDemo';

import { generatePageTheme } from 'components/AppTheme';

const ThreeParticles = ({ theme }) => (
  <>
    <NextSEO
      config={{
        title:
          '🔆 A 2D/3D particle library built on React, Three.js and WebGL | Tim Ellenberger',
        openGraph: {
          title:
            '🔆 A 2D/3D particle library built on React, Three.js and WebGL | Tim Ellenberger'
        }
      }}
    />
    <ThemeProvider theme={theme}>
      <Container>
        <ParticlesDemo />
      </Container>
    </ThemeProvider>
  </>
);

ThreeParticles.propTypes = {
  theme: PropTypes.object
};

ThreeParticles.defaultProps = {
  theme: {}
};

// Get URL and generate page theme
ThreeParticles.getInitialProps = async () => {
  const theme = generatePageTheme({
    fontColor: '#31d7f9',
    highlightFontColor: 'springgreen',
    backgroundColor: '#3b3f45',
    override: {
      headerNavFontColor: 'gainsboro',
      headerNavHamburgerIconColor: 'gainsboro',
      popoutMenuBorderColor: 'black'
    }
  });

  return { theme };
};

export default ThreeParticles;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 100vh;
  user-select: none;
  background: #272727;
`;
