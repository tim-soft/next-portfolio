import React from 'react';
import styled from 'styled-components';
import PageScrollWrapper from '../components/PageScrollWrapper';
import PortfolioList from '../components/Portfolio';

const PortfolioPage = () => (
  <PageScrollWrapper>
    <Title>Portfolio</Title>
    <PortfolioList />
  </PageScrollWrapper>
);

// _app.js level theme variable overrides
PortfolioPage.theme = {
  headerNavFontColor: 'black',
  headerNavHamburgerIconColor: 'black'
};

export default PortfolioPage;

const Title = styled.h1`
  color: black;
  font-size: 50px;
`;
