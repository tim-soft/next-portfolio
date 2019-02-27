import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import PageScrollWrapper from '../components/PageScrollWrapper';
import PortfolioList from '../components/Portfolio';

const PortfolioPage = () => (
  <>
    <Head>
      <title>Tim Ellenberger | Portfolio</title>
    </Head>
    <PageScrollWrapper>
      <Title>Portfolio</Title>
      <PortfolioList />
    </PageScrollWrapper>
  </>
);

// _app.js level theme variable overrides
PortfolioPage.theme = {
  headerNavFontColor: 'black',
  headerNavHoverFontColor: '#00e5e5',
  headerNavHamburgerIconColor: 'black'
};

export default PortfolioPage;

const Title = styled.h1`
  color: black;
  font-size: 50px;
`;
