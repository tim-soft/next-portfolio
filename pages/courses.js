import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import NextSEO from 'next-seo';
import PageScrollWrapper from 'components/PageScrollWrapper';

const CoursesPage = () => (
  <>
    <Head>
      <meta name="theme-color" content="#1D1E1F" />
    </Head>
    <NextSEO
      config={{
        title: 'React and GraphQL Courses | Tim Ellenberger',
        openGraph: {
          title: 'React and GraphQL Courses | Tim Ellenberger'
        }
      }}
    />
    <PageScrollWrapper>
      <Title>Courses: Under Construction</Title>
    </PageScrollWrapper>
  </>
);

// _app.js level theme variable overrides
CoursesPage.theme = {
  headerNavFontColor: 'black',
  headerNavHoverFontColor: '#00e5e5',
  headerNavHamburgerIconColor: 'black'
};

export default CoursesPage;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
`;
