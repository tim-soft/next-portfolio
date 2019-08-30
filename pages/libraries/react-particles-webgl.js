import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import NextSEO from 'next-seo';
import PageScrollWrapper from 'components/PageScrollWrapper';
import { darkTheme } from 'components/AppTheme';
import { ProjectBadge, ProjectBadgeList } from 'components/Portfolio';

const ParticlesPage = ({ theme }) => (
  <>
    <NextSEO
      config={{
        title: 'Portfolio | Tim Ellenberger',
        openGraph: {
          title: 'Portfolio | Tim Ellenberger'
        }
      }}
    />
    <ThemeProvider theme={theme}>
      <PageScrollWrapper>
        <PageContainer>
          <PageTitle>react-particles-webgl</PageTitle>
          <ProjectBadgeList style={{ textAlign: 'center' }}>
            <ProjectBadge
              badgeUrl="https://img.shields.io/npm/v/react-particles-webgl.svg?color=brightgreen&style=popout-square"
              linkUrl="https://www.npmjs.com/package/react-particles-webgl"
            />
            <ProjectBadge
              badgeUrl="https://img.shields.io/github/license/tim-soft/react-particles-webgl?color=brightgreen&style=popout-square"
              linkUrl="https://github.com/tim-soft/react-particles-webgl/blob/master/LICENSE.md"
            />
            <ProjectBadge
              badgeUrl="https://img.shields.io/bundlephobia/minzip/react-particles-webgl.svg?style=popout-square"
              linkUrl="https://bundlephobia.com/result?p=react-particles-webgl"
            />
            <ProjectBadge
              badgeUrl="https://img.shields.io/travis/tim-soft/react-particles-webgl?style=flat-square"
              linkUrl="https://travis-ci.org/tim-soft/react-particles-webgl"
            />
          </ProjectBadgeList>
          <p>A 2D/3D particle library built on React, Three.js and WebGL</p>
          <section>
            <h2>Test 1</h2>
          </section>
          <section>
            <h2>Test 2</h2>
          </section>
        </PageContainer>
      </PageScrollWrapper>
    </ThemeProvider>
  </>
);

ParticlesPage.propTypes = {
  theme: PropTypes.object
};

ParticlesPage.defaultProps = {
  theme: {}
};

ParticlesPage.pageTheme = darkTheme;

export default ParticlesPage;

const PageContainer = styled.main`
  color: ${({ theme }) => theme.pageContentFontColor};
  width: 100%;
  max-width: 1100px;
  > section {
    margin-bottom: 4em;
  }
  a {
    transition: color 0.2s linear;
    color: ${({ theme }) => theme.pageContentFontColor};
    :hover {
      color: ${({ theme }) => theme.pageContentLinkHoverColor};
    }
  }
`;

const PageTitle = styled.h1`
  font-size: 50px;
  text-align: center;
`;
