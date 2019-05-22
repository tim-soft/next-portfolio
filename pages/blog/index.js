import React from 'react';
import styled from 'styled-components';
import NextSEO, { BlogJsonLd } from 'next-seo';
import PageScrollWrapper from 'components/PageScrollWrapper';
import { IndexListItem } from 'components/Blog';
import BlogPosts from 'data/BlogPosts';

const BlogPage = () => (
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
      <Title>Blog: Under Construction</Title>
      {BlogPosts.map(({ href, title, description }) => (
        <IndexListItem
          href={href}
          title={title}
          description={description}
          key={href}
        />
      ))}
    </PageScrollWrapper>
  </>
);

// _app.js level theme variable overrides
BlogPage.theme = {
  headerNavFontColor: 'black',
  headerNavHoverFontColor: '#00e5e5',
  headerNavHamburgerIconColor: 'black',
  pageBackgroundColor: 'grey'
};

export default BlogPage;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
`;
