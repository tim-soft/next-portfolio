import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import styled from 'styled-components';
import HeaderNav from './components/HeaderNav';

// eslint-disable-next-line react/prefer-stateless-function
export default class WebsiteLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    showBio: PropTypes.bool
  };

  static defaultProps = {
    showBio: false
  };

  render() {
    const { children, showBio } = this.props;

    return (
      <StyledContainer>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        </Head>
        <HeaderNav showBio={showBio} />
        {children}
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.div`
  overflow: hidden;
  * ::selection {
    background: ${({ theme }) => theme.pageContentSelectionColor};
  }
`;
