import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import ParticlesDemo from 'components/ParticlesDemo';

const ThreeParticles = () => (
  <>
    <Head>
      <title>Tim Ellenberger | React Particles WebGL</title>
    </Head>
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
