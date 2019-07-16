import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import NextSEO, { BreadcrumbJsonLd } from 'next-seo';
import ParticlesDemo from 'components/ParticlesDemo';

import { generatePageTheme } from 'components/AppTheme';

const ThreeParticles = ({ theme }) => (
  <>
    {/* https://schema.org/breadcrumb */}
    <BreadcrumbJsonLd
      itemListElements={[
        {
          position: 1,
          name: 'https://timellenberger.com',
          item: 'https://timellenberger.com'
        },
        {
          position: 2,
          name: 'React Particles WebGL',
          item: 'https://timellenberger.com/particles'
        }
      ]}
    />
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

// Override default app theme for this page
ThreeParticles.pageTheme = generatePageTheme({
  fontColor: '#31d7f9',
  highlightFontColor: 'springgreen',
  backgroundColor: '#3b3f45',
  override: {
    headerNavFontColor: 'gainsboro',
    headerNavHamburgerIconColor: 'gainsboro',
    popoutMenuBorderColor: 'black'
  }
});

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
