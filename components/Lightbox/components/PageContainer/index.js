import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Page = ({ children }) => <PageContainer>{children}</PageContainer>;

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired
};

export default Page;

const PageContainer = styled.div`
  background: rgba(0, 0, 0, 0.7);
  height: 100%;
  width: 100%;
`;
