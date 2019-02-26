import React from 'react';
import styled from 'styled-components';
import { HamburgerMenuIcon, FullPageMenu } from './components';

export default class MobileMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuIsOpen: false
    };
  }

  render() {
    const { menuIsOpen } = this.state;

    return (
      <MobileRightSideMenu>
        <HamburgerMenuIcon
          menuIsOpen={menuIsOpen}
          toggleMenu={() => this.setState({ menuIsOpen: !menuIsOpen })}
        />
        <FullPageMenu
          menuIsOpen={menuIsOpen}
          toggleMenu={() => this.setState({ menuIsOpen: !menuIsOpen })}
        />
      </MobileRightSideMenu>
    );
  }
}

const MobileRightSideMenu = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  z-index: inherit;
  @media (min-width: 1061px) {
    display: none;
  }
`;
