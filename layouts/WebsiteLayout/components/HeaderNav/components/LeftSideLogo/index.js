import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import StyledLogo from '../StyledLink';

const LeftSideLogo = ({ menuIsOpen, toggleMenu }) => (
  <Link prefetch href="/">
    <Logo menuIsOpen={menuIsOpen} onClick={() => menuIsOpen && toggleMenu()}>
      Tim Ellenberger
    </Logo>
  </Link>
);

LeftSideLogo.propTypes = {
  menuIsOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired
};

export default LeftSideLogo;

const Logo = styled(StyledLogo)`
  z-index: 21;
  color: ${({ theme, menuIsOpen }) =>
    menuIsOpen
      ? theme.headerNavMobileMenuFontColor
      : theme.headerNavHamburgerIconColor};
`;
