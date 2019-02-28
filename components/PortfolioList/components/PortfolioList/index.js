import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PortfolioList = ({ children }) => (
  <PortfolioListContainer>{children}</PortfolioListContainer>
);

PortfolioList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired
};

export default PortfolioList;

const PortfolioListContainer = styled.ul`
  width: 100%;
  max-width: 1400px;
  list-style-type: none;
  padding-inline-start: unset;
`;
