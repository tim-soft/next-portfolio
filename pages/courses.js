import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import PageScrollWrapper from 'components/PageScrollWrapper';

const CoursesPage = () => (
  <>
    <Head>
      <title>React and GraphQL Courses | Tim Ellenberger</title>
    </Head>
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
