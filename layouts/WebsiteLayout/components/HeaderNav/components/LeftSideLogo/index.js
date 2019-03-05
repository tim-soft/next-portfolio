import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import StyledLogo from '../StyledLink';

const LeftSideLogo = ({ menuIsOpen, toggleMenu }) => (
  <Link prefetch href="/">
    <Logo menuIsOpen={menuIsOpen} onClick={() => menuIsOpen && toggleMenu()}>
      Tim Ellenberger
      <Subheading menuIsOpen={menuIsOpen}>
        <span>React</span>
        <span> | </span>
        <span>GraphQL</span>
        <span> | </span>
        <span>Consulting</span>
      </Subheading>
    </Logo>
  </Link>
);

LeftSideLogo.propTypes = {
  menuIsOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired
};

export default LeftSideLogo;

const Subheading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  margin: 0;
  padding: 0 12px;
  transition: color 0.2s linear;
  color: ${({ theme, menuIsOpen }) =>
    menuIsOpen
      ? theme.headerNavMobileMenuFontColor
      : theme.headerNavHamburgerIconColor};
`;

const Logo = styled(StyledLogo)`
  height: 100%;
  padding: 0;
  z-index: 21;
  font-size: 2.2em;
  ::before {
    top: 110%;
  }
  color: ${({ theme, menuIsOpen }) =>
    menuIsOpen
      ? theme.headerNavMobileMenuFontColor
      : theme.headerNavHamburgerIconColor};
  @media (${({ theme }) => theme.breakpoints.desktopNav}) {
    margin: 0;
  }
`;
