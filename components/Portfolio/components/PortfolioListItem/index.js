import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PortfolioListItem = ({ projectTitle }) => (
  <PortfolioListItemContainer>{projectTitle}</PortfolioListItemContainer>
);

PortfolioListItem.propTypes = {
  projectTitle: PropTypes.string.isRequired
};

export default PortfolioListItem;

const PortfolioListItemContainer = styled.li`
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: black;
  margin: 30px 0;
`;
