import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import NextSEO from 'next-seo';
import PageScrollWrapper from 'components/PageScrollWrapper';
import PortfolioList from 'components/PortfolioList';

const PortfolioPage = ({ theme }) => (
  <>
    <NextSEO
      config={{
        title: 'Portfolio | Tim Ellenberger',
        openGraph: {
          title: 'Portfolio | Tim Ellenberger'
        }
      }}
    />
    <ThemeProvider theme={theme}>
      <PageScrollWrapper>
        <Title>Portfolio</Title>
        <PortfolioList />
      </PageScrollWrapper>
    </ThemeProvider>
  </>
);

PortfolioPage.propTypes = {
  theme: PropTypes.object
};

PortfolioPage.defaultProps = {
  theme: {}
};

export default PortfolioPage;

const Title = styled.h1`
  color: black;
  font-size: 50px;
`;
