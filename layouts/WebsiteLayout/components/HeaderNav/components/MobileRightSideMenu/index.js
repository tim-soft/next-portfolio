import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { HamburgerMenuIcon, FullPageMenu } from './components';

const MobileMenu = ({ menuIsOpen, toggleMenu }) => (
  <MobileRightSideMenu>
    <HamburgerMenuIcon
      menuIsOpen={menuIsOpen}
      toggleMenu={() => toggleMenu()}
    />
    <FullPageMenu menuIsOpen={menuIsOpen} toggleMenu={() => toggleMenu()} />
  </MobileRightSideMenu>
);

MobileMenu.propTypes = {
  menuIsOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired
};

export default MobileMenu;

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
