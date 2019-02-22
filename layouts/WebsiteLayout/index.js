import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import styled from 'styled-components';
import HeaderNav from './components/HeaderNav';

const StyledContainer = styled.div`
  overflow: hidden;
`;

// eslint-disable-next-line react/prefer-stateless-function
class WebsiteLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    const { children } = this.props;

    return (
      <StyledContainer>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        </Head>
        <HeaderNav />
        {children}
      </StyledContainer>
    );
  }
}

export default WebsiteLayout;
