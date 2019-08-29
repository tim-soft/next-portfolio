import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import NextSEO from 'next-seo';
import {
  ProjectList,
  ProjectListItem,
  ProjectTitle,
  ProjectBadge,
  ProjectBadgeList
} from 'components/Portfolio';
import PageScrollWrapper from 'components/PageScrollWrapper';

const PortfolioPage = ({ theme }) => (
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
          <PageTitle>Portfolio</PageTitle>
          <section>
            <h2>Open Source</h2>
            <p>
              Aside from numerous contributions to <i>other</i> open-source
              projects such as ant-design, react-dat-gui, react-starter-kit,
              react-use-gesture, graphql-tools and others, I&apos;ve also
              released several projects of my own.
            </p>
            <ProjectList>
              <ProjectListItem>
                <ProjectTitle
                  href="https://github.com/tim-soft/next-portfolio"
                  text="next-portfolio"
                />
                <ProjectBadgeList>
                  <ProjectBadge
                    badgeUrl="https://img.shields.io/github/package-json/v/tim-soft/next-portfolio.svg?color=brightgreen&style=popout-square"
                    linkUrl="https://github.com/tim-soft/next-portfolio"
                  />
                  <ProjectBadge
                    badgeUrl="https://img.shields.io/github/license/tim-soft/next-portfolio?color=brightgreen&style=popout-square"
                    linkUrl="https://github.com/tim-soft/next-portfolio/blob/master/LICENSE.md"
                  />
                </ProjectBadgeList>
                <p>
                  My personal website, blog and library demo playground, built
                  from scratch with Next.js
                </p>
              </ProjectListItem>
              <ProjectListItem>
                <ProjectTitle
                  href="https://github.com/tim-soft/react-particles-webgl"
                  text="react-particles-webgl"
                />
                <ProjectBadgeList>
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
                <p>
                  A 2D/3D particle library built on React, Three.js and WebGL
                </p>
              </ProjectListItem>
              <ProjectListItem>
                <ProjectTitle
                  href="https://github.com/tim-soft/react-spring-lightbox"
                  text="react-spring-lightbox"
                />
                <ProjectBadgeList>
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
                  A flexible image gallery lightbox with native-feeling touch
                  gestures and buttery smooth animations, built with
                  react-spring.
                </p>
              </ProjectListItem>
              <ProjectListItem>
                <ProjectTitle
                  href="https://github.com/tim-soft/use-double-click"
                  text="use-double-click"
                />
                <ProjectBadgeList>
                  <ProjectBadge
                    badgeUrl="https://img.shields.io/npm/v/use-double-click.svg?color=brightgreen&style=popout-square"
                    linkUrl="https://www.npmjs.com/package/use-double-click"
                  />
                  <ProjectBadge
                    badgeUrl="https://img.shields.io/github/license/tim-soft/use-double-click?color=brightgreen&style=popout-square"
                    linkUrl="https://github.com/tim-soft/use-double-click/blob/master/LICENSE.md"
                  />
                  <ProjectBadge
                    badgeUrl="https://img.shields.io/bundlephobia/minzip/use-double-click.svg?style=popout-square"
                    linkUrl="https://bundlephobia.com/result?p=use-double-click"
                  />
                  <ProjectBadge
                    badgeUrl="https://img.shields.io/codecov/c/github/tim-soft/use-double-click?style=flat-square"
                    linkUrl="https://codecov.io/gh/tim-soft/use-double-click"
                  />
                  <ProjectBadge
                    badgeUrl="https://img.shields.io/travis/tim-soft/use-double-click?style=flat-square"
                    linkUrl="https://travis-ci.org/tim-soft/use-double-click"
                  />
                </ProjectBadgeList>
                <p>
                  A simple React hook for differentiating single and double
                  clicks on the same component.
                </p>
              </ProjectListItem>
            </ProjectList>
          </section>
          <section>
            <h2>Products</h2>
            <p>[coming soon]</p>
          </section>
        </PageContainer>
      </PageScrollWrapper>
    </ThemeProvider>
  </>
);

PortfolioPage.propTypes = {
  theme: PropTypes.object
};

PortfolioPage.defaultProps = {
  theme: {}
};

export default PortfolioPage;

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
