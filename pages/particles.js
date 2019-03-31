import React from 'react';
import styled from 'styled-components';
import NextSEO from 'next-seo';
import ParticlesDemo from 'components/ParticlesDemo';

const ThreeParticles = () => (
  <>
    <NextSEO
      config={{
        title: 'React Particles WebGL | Tim Ellenberger',
        openGraph: {
          title: 'React Particles WebGL | Tim Ellenberger'
        }
      }}
    />
    <Container>
      <ParticlesDemo />
    </Container>
  </>
);

// _app.js level theme variable overrides
ThreeParticles.theme = {
  headerNavFontColor: 'white',
  headerNavHoverFontColor: 'cyan',
  headerNavHamburgerIconColor: 'white'
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
  overflow: hidden;
  background: #272727;
`;
