import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import PageScrollWrapper from 'components/PageScrollWrapper';

const BlogPage = () => (
  <>
    <Head>
      <title>Coding, Musings and Adventures of Tim Ellenberger</title>
    </Head>
    <PageScrollWrapper>
      <Title>Blog: Under Construction</Title>
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
`;
