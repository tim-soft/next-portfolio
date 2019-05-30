import React from 'react';
import styled from 'styled-components';
import NextSEO, { BlogJsonLd } from 'next-seo';
import PageScrollWrapper from 'components/PageScrollWrapper';
import { IndexListItem, BlogLink } from 'components/Blog';
import { getSortedPosts } from 'data/BlogPosts';

const BlogPage = () => {
  // Get blog posts, sorted newest to oldest
  const sortedPosts = getSortedPosts({ order: 'desc' });

  return (
    <>
      <NextSEO
        config={{
          title: 'Coding, Musings and Adventures of Tim Ellenberger',
          openGraph: {
            title: 'Coding, Musings and Adventures of Tim Ellenberger'
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
      <PageScrollWrapper>
        <Container>
          <Title>Blog</Title>
          <BioContainer>
            <AvatarImage src="/static/avatar.png" alt="avatar" />
            <BioMetaContainer>
              <p>
                A personal blog by{' '}
                <StyledBlogLink href="/">Tim Ellenberger</StyledBlogLink>.
              </p>
              <p>Building new webs out of the old ones.</p>
            </BioMetaContainer>
          </BioContainer>

          {sortedPosts.map(post => (
            <IndexListItem key={post.href} {...post} />
          ))}
        </Container>
      </PageScrollWrapper>
    </>
  );
};

// const fontColor = '#BAE7DC'; // Chalky White
// const fontColor = '#28A9C5'; // Blue
// const fontColor = '#B5B69D';
// const fontColor = '#aaf0d1'; // Mint Magic

const fontColor = '#2dbad8';
const highlightFontColor = 'springgreen';
const backgroundColor = '#202629';

// _app.js level theme variable overrides
BlogPage.theme = {
  headerNavFontColor: fontColor,
  headerNavTextUnderlineColor: highlightFontColor,
  headerNavHoverFontColor: highlightFontColor,
  headerNavHamburgerIconColor: fontColor,
  pageBackgroundColor: backgroundColor,
  pageContentFontColor: fontColor,
  pageContentLinkHoverColor: highlightFontColor
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

const StyledBlogLink = styled(BlogLink)`
  color: ${({ theme }) => theme.pageContentFontColor};
  font-weight: normal;
  font-size: inherit;
`;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
`;

const Container = styled.main`
  color: ${({ theme }) => theme.pageContentFontColor};
  width: 100%;
  max-width: 700px;
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
