import React from 'react';
import styled from 'styled-components';
import { LeftSideLogo, RightSideMenu, MobileRightSideMenu } from './components';

/**
 * Fixed top header component with main site navigation
 * Prefetches nav route links https://nextjs.org/docs#prefetching-pages
 */
export default class HeaderNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuIsOpen: false
    };
  }

  render() {
    const { menuIsOpen } = this.state;

    return (
      <HeaderStyled>
        <LeftSideLogo
          menuIsOpen={menuIsOpen}
          toggleMenu={() => this.setState({ menuIsOpen: !menuIsOpen })}
        />

        <RightSideMenu />
        <MobileRightSideMenu
          menuIsOpen={menuIsOpen}
          toggleMenu={() => this.setState({ menuIsOpen: !menuIsOpen })}
        />
      </HeaderStyled>
    );
  }
}

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
  display: flex;
  align-items: center;
  overflow: hidden;
  @media (max-width: 500px) {
    padding-left: 5px;
    padding-right: 5px;
  }
`;
