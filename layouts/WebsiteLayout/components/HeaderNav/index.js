import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LeftSideLogo, RightSideMenu, MobileRightSideMenu } from './components';

/**
 * Fixed top header component with main site navigation
 * Prefetches nav route links https://nextjs.org/docs#prefetching-pages
 */
export default class HeaderNav extends React.Component {
  static propTypes = {
    showBio: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      menuIsOpen: false
    };
  }

  render() {
    const { showBio } = this.props;
    const { menuIsOpen } = this.state;

    return (
      <HeaderStyled>
        <HeaderItemContainer>
          <LeftSideLogo
            menuIsOpen={menuIsOpen}
            toggleMenu={() => this.setState({ menuIsOpen: !menuIsOpen })}
            showBio={showBio}
          />

          <RightSideMenu />
          <MobileRightSideMenu
            menuIsOpen={menuIsOpen}
            toggleMenu={() => this.setState({ menuIsOpen: !menuIsOpen })}
          />
        </HeaderItemContainer>
      </HeaderStyled>
    );
  }
}

const HeaderItemContainer = styled.div`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: inherit;
`;

const HeaderStyled = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  padding: 15px;
  background: none;
  color: white;
  z-index: 20;
  overflow: visible;
  @media (max-width: 500px) {
    padding-left: 5px;
    padding-right: 5px;
  }
`;
