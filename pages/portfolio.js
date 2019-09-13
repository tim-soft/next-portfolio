import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import NextSEO, { BreadcrumbJsonLd } from 'next-seo';
import { GoLinkExternal } from 'react-icons/go';
import LibraryData from 'data/Libraries';
import {
  ProjectList,
  ProjectListItem,
  ProjectTitle,
  ProjectBadge,
  ProjectBadgeList
} from 'components/Portfolio';
import { BlogLink } from 'components/Blog';
import PageScrollWrapper from 'components/PageScrollWrapper';
import { greyTheme } from 'components/AppTheme';
import HorizontalRule from 'components/HorizontalRule';
import PageFooter from 'components/PageFooter';

const APP_URL = process.env.APP_BASE_URL;

const PortfolioPage = ({ theme, route }) => (
  <>
    {/* https://schema.org/breadcrumb */}
    <BreadcrumbJsonLd
      itemListElements={[
        {
          position: 1,
          name: APP_URL,
          item: APP_URL
        },
        {
          position: 2,
          name: 'Portfolio',
          item: `${APP_URL}${route}`
        }
      ]}
    />
    <NextSEO
      config={{
        title: 'Portfolio | Tim Ellenberger',
        canonical: `${APP_URL}${route}`,
        openGraph: {
          url: `${APP_URL}${route}`,
          title: 'Portfolio | Tim Ellenberger',
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
              {LibraryData.map(library => (
                <ProjectListItem key={library.name}>
                  <ProjectTitle href={library.repoUrl} text={library.name} />
                  <ProjectBadgeList style={{ marginTop: 0 }}>
                    {library.badges.map(badge => (
                      <ProjectBadge
                        key={badge.badgeUrl}
                        badgeUrl={badge.badgeUrl}
                        linkUrl={badge.linkUrl}
                      />
                    ))}
                  </ProjectBadgeList>
                  <p>{library.description}</p>
                  <p>
                    <DocumentationLink
                      href={library.href}
                      style={{ display: 'inline-flex', alignItems: 'center' }}
                      paragraph
                    >
                      <span>Read the documentation</span>
                      <GoLinkExternal size="1.2em" />
                    </DocumentationLink>
                  </p>
                </ProjectListItem>
              ))}
            </ProjectList>
          </section>
          <section>
            <h2>Products</h2>
            <p>[coming soon]</p>
          </section>
          <HorizontalRule />
          <StyledPageFooter />
        </PageContainer>
      </PageScrollWrapper>
    </ThemeProvider>
  </>
);

PortfolioPage.propTypes = {
  theme: PropTypes.object,
  route: PropTypes.string.isRequired
};

PortfolioPage.defaultProps = {
  theme: {}
};

PortfolioPage.pageTheme = greyTheme;

export default PortfolioPage;

const StyledPageFooter = styled(PageFooter)`
  margin: 2em 0;
`;

const DocumentationLink = styled(BlogLink)`
  display: inline-flex;
  align-items: center;
  > svg {
    margin-left: 0.4em;
  }
`;

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
