import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import NextSEO from 'next-seo';
import PageScrollWrapper from 'components/PageScrollWrapper';
import { darkTheme } from 'components/AppTheme';
import { ProjectBadge, ProjectBadgeList } from 'components/Portfolio';
import { BlogImageGallery } from 'components/Blog';

const images = [
  {
    src: 'https://i.imgur.com/8oNzu0S.png',
    alt: 'README.md',
    caption: 'README.md',
    width: 2486,
    height: 1469
  },
  {
    src:
      'https://timellenberger.com/static/blog-content/dark-mode/win10-dark-mode.jpg',
    alt: 'Windows 10 Dark Mode Setting',
    caption: 'Windows 10 Dark Mode Setting',
    width: 2848,
    height: 2035
  },
  {
    src:
      'https://timellenberger.com/static/blog-content/dark-mode/macos-dark-mode.png',
    alt: 'macOS Mojave Dark Mode Setting',
    caption: 'macOS Mojave Dark Mode Setting',
    width: 1200,
    height: 1218
  },
  {
    src:
      'https://timellenberger.com/static/blog-content/dark-mode/android-9-dark-mode.jpg',
    alt: 'Android 9.0 Dark Mode Setting',
    caption: 'Android 9.0 Dark Mode Setting',
    width: 1280,
    height: 600
  }
];

const LightboxPage = ({ theme }) => (
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
          <PageTitle>react-spring-lightbox</PageTitle>
          <ProjectBadgeList style={{ textAlign: 'center' }}>
            <ProjectBadge
              badgeUrl="https://img.shields.io/npm/v/react-spring-lightbox.svg?color=brightgreen&style=popout-square"
              linkUrl="https://www.npmjs.com/package/react-spring-lightbox"
            />
            <ProjectBadge
              badgeUrl="https://img.shields.io/github/license/tim-soft/react-spring-lightbox?color=brightgreen&style=popout-square"
              linkUrl="https://github.com/tim-soft/react-spring-lightbox/blob/master/LICENSE.md"
            />
            <ProjectBadge
              badgeUrl="https://img.shields.io/bundlephobia/minzip/react-spring-lightbox.svg?style=popout-square"
              linkUrl="https://bundlephobia.com/result?p=react-spring-lightbox"
            />
            <ProjectBadge
              badgeUrl="https://img.shields.io/travis/tim-soft/react-spring-lightbox?style=flat-square"
              linkUrl="https://travis-ci.org/tim-soft/react-spring-lightbox"
            />
          </ProjectBadgeList>
          <p>
            A flexible image gallery lightbox with native-feeling touch gestures
            and buttery smooth animations, built with react-spring.
          </p>
          <section>
            <h2>Test 1</h2>
            <BlogImageGallery galleryTitle="Test 1" images={images} />
          </section>
          <section>
            <h2>Test 2</h2>
            <BlogImageGallery galleryTitle="Test 1" images={images} />
          </section>
        </PageContainer>
      </PageScrollWrapper>
    </ThemeProvider>
  </>
);

LightboxPage.propTypes = {
  theme: PropTypes.object
};

LightboxPage.defaultProps = {
  theme: {}
};

LightboxPage.pageTheme = darkTheme;

export default LightboxPage;

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
