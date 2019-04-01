import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import NextSEO from 'next-seo';
import ParticlesDemo from 'components/ParticlesDemo';

const ThreeParticles = () => (
  <>
    <Head>
      <meta name="theme-color" content="#1D1E1F" />
    </Head>
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
