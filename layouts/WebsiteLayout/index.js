import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Color from 'color';
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
  * ::-moz-selection {
    background: ${({ theme }) =>
      new Color(theme.pageContentSelectionColor).darken(0.57).hex()};
  }
`;
