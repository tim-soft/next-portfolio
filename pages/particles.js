import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import NextSEO, { BreadcrumbJsonLd } from 'next-seo';
import ParticlesDemo from 'components/ParticlesDemo';
import { generatePageTheme } from 'components/AppTheme';

const APP_URL = process.env.APP_BASE_URL;

const ThreeParticles = ({ theme, route }) => (
  <>
    {/* https://schema.org/breadcrumb */}
    <BreadcrumbJsonLd
      itemListElements={[
        {
          position: 1,
          name: APP_URL,
          item: `${APP_URL}/`
        },
        {
          position: 2,
          name: 'React Particles WebGL',
          item: `${APP_URL}${route}`
        }
      ]}
    />
    <NextSEO
      config={{
        title:
          '🔆 A 2D/3D particle library built on React, Three.js and WebGL | Tim Ellenberger',
        canonical: `${APP_URL}${route}`,
        openGraph: {
          url: `${APP_URL}${route}`,
          title:
            '🔆 A 2D/3D particle library built on React, Three.js and WebGL | Tim Ellenberger',
          images: [
            {
              url: `${APP_URL}/static/avatar.png`,
              alt: 'Avatar Logo'
            }
          ],
          type: 'website'
        },
        site_name: 'Coding, Musings and Adventures of Tim Ellenberger',
        locale: 'en_US',
        profile: {
          firstName: 'Tim',
          lastName: 'Ellenberger',
          username: 'tim-soft',
          gender: 'male'
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
  theme: PropTypes.object,
  route: PropTypes.string.isRequired
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
