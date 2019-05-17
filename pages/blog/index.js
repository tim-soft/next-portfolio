import React from 'react';
import styled from 'styled-components';
import NextSEO, { BlogJsonLd } from 'next-seo';
import PageScrollWrapper from 'components/PageScrollWrapper';
import { IndexListItem } from 'components/Blog';

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
      <IndexListItem
        href="/blog/test-blog-entry"
        title="Test Blog Entry"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae
        justo eget magna fermentum iaculis. Tristique senectus et netus et
        malesuada fames ac turpis egestas. Elit eget gravida cum sociis natoque
        penatibus et magnis dis."
      />
      <IndexListItem
        href="/blog/test-blog-entry-2"
        title="Test Blog Entry 2"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Eu sem integer vitae
        justo eget magna fermentum iaculis. Tristique senectus et netus et
        malesuada fames ac turpis egestas. Elit eget gravida cum sociis natoque
        penatibus et magnis dis."
      />
      <IndexListItem
        href="/blog/test-blog-entry-3"
        title="Test Blog Entry 3"
        description="This is a preview of the blog text"
      />
      <IndexListItem
        href="/blog/test-blog-entry-4"
        title="Test Blog Entry 4"
        description="This is a preview of the blog text"
      />
    </PageScrollWrapper>
  </>
);

// _app.js level theme variable overrides
BlogPage.theme = {
  headerNavFontColor: 'black',
  headerNavHoverFontColor: '#00e5e5',
  headerNavHamburgerIconColor: 'black'
};

export default BlogPage;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
`;
