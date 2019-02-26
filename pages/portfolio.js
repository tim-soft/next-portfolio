import React from 'react';
import styled from 'styled-components';
import PortfolioList from '../components/Portfolio';

// todo
// add param to allow WebsiteLayout to scroll specifically for this page
// add param to change header nav font
const PortfolioPage = () => (
  <Container>
    <SpacerFromTop />
    <Title>Portfolio</Title>
    <PortfolioList />
  </Container>
);

PortfolioPage.theme = {
  headerNavFontColor: 'black',
  headerNavHamburgerIconColor: 'black'
};

export default PortfolioPage;

const SpacerFromTop = styled.span`
  margin-top: 125px;
`;

const Title = styled.h1`
  color: black;
  font-size: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  height: 100vh;
  background: #9e9e9e;
`;
