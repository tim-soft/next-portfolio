import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import NextSEO from 'next-seo';
import PageScrollWrapper from 'components/PageScrollWrapper';
import PortfolioList from 'components/PortfolioList';

const PortfolioPage = () => (
  <>
    <Head>
      <meta name="theme-color" content="#9e9e9e" />
    </Head>
    <NextSEO
      config={{
        title: 'Portfolio | Tim Ellenberger',
        openGraph: {
          title: 'Portfolio | Tim Ellenberger'
        }
      }}
    />
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
