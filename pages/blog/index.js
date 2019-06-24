import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import NextSEO, { BlogJsonLd } from 'next-seo';
import PageScrollWrapper from 'components/PageScrollWrapper';
import { IndexListItem, BlogLink } from 'components/Blog';
import { generatePageTheme } from 'components/AppTheme';
import { getSortedPosts } from 'data/BlogPosts';

const BlogPage = ({ baseUrl, theme }) => {
  // Get blog posts, sorted newest to oldest
  const sortedPosts = getSortedPosts({ order: 'desc' });

  return (
    <>
      <NextSEO
        config={{
          title: 'Coding, Musings and Adventures of Tim Ellenberger',
          canonical: `${baseUrl}/blog`,
          openGraph: {
            url: `${baseUrl}/blog`,
            title: 'Coding, Musings and Adventures of Tim Ellenberger'
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
      <BlogJsonLd
        url="https://timellenberger.now.sh/blog"
        title="Coding, Musings and Adventures of Tim Ellenberger"
        images={['https://timellenberger.now.sh/static/avatar.png']}
        datePublished="2019-03-31T08:00:00+08:00"
        dateModified="2019-03-31T09:00:00+08:00"
        authorName="Tim Ellenberger"
        description="Coding, Musings and Adventures of Tim Ellenberger"
      />
      <ThemeProvider theme={theme}>
        <PageScrollWrapper>
          <Container>
            <Title>Blog</Title>
            <BioContainer>
              <AvatarImage src="/static/avatar.png" alt="avatar" />
              <BioMetaContainer>
                <p>
                  A personal blog by{' '}
                  <BlogLink href="/" paragraph>
                    Tim Ellenberger
                  </BlogLink>
                  .
                </p>
                <p>Building new webs out of the old ones.</p>
              </BioMetaContainer>
            </BioContainer>

            {sortedPosts.map(post => (
              <IndexListItem key={post.href} {...post} />
            ))}
          </Container>
        </PageScrollWrapper>
      </ThemeProvider>
    </>
  );
};

BlogPage.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  theme: PropTypes.object
};

BlogPage.defaultProps = {
  theme: {}
};

// Override default app theme for this page
BlogPage.pageTheme = generatePageTheme({
  fontColor: '#31d7f9',
  highlightFontColor: 'springgreen',
  backgroundColor: '#202629'
});

// Get absolute url of page
BlogPage.getInitialProps = async ({ req }) => {
  const hostname = req ? req.headers.host : window.location.hostname;
  const protocol = hostname.includes('localhost') ? 'http' : 'https';

  return { baseUrl: `${protocol}/${hostname}` };
};

export default BlogPage;

const BioContainer = styled.aside`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BioMetaContainer = styled.div`
  margin: 15px 0 15px 15px;
  font-size: 1.1em;
`;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
`;

const Container = styled.main`
  color: ${({ theme }) => theme.pageContentFontColor};
  width: 100%;
  max-width: ${({ theme, width }) => width || theme.pageContentWidth}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.5em;
`;

const AvatarImage = styled.img`
  width: 90px;
  border-radius: 50%;
  margin: 20px 0;
`;
