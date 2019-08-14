import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import NextSEO from 'next-seo';
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
          <Title>Portfolio</Title>
          <section>
            <h2>Open Source</h2>
            <p>
              Aside from numerous contributions to <i>other</i> open-source
              projects such as ant-design, react-starter-kit, react-use-gesture,
              graphql-tools and others, I&apos;ve also released several projects
              of my own.
            </p>
            <h3>
              <a
                href="https://github.com/tim-soft/next-portfolio"
                target="_blank"
                rel="noopener noreferrer"
              >
                next-portfolio
              </a>
            </h3>
            <p>
              My personal website, blog and library demo playground, built from
              scratch with Next.js
            </p>
            <h3>
              <a
                href="https://github.com/tim-soft/react-particles-webgl"
                target="_blank"
                rel="noopener noreferrer"
              >
                react-particles-webgl
              </a>
            </h3>
            <p>A 2D/3D particle library built on React, Three.js and WebGL</p>
            <h3>
              <a
                href="https://github.com/tim-soft/react-spring-lightbox"
                target="_blank"
                rel="noopener noreferrer"
              >
                react-spring-lightbox
              </a>
            </h3>
            <p>
              A flexible image gallery lightbox with native-feeling touch
              gestures and buttery smooth animations, built with react-spring.
            </p>
            <h3>
              <a
                href="https://github.com/tim-soft/use-double-click"
                target="_blank"
                rel="noopener noreferrer"
              >
                use-double-click
              </a>
            </h3>
            <p>
              A simple React hook for differentiating single and double clicks
              on the same component.
            </p>
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
  width: 100%;
  max-width: 1100px;
  > section {
    margin-bottom: 4em;
  }
  a {
    transition: color 0.2s linear;
    color: #0905d2;
    :hover {
      color: ${({ theme }) => theme.pageContentLinkHoverColor};
    }
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.pageContentFontColor};
  font-size: 50px;
  text-align: center;
`;
