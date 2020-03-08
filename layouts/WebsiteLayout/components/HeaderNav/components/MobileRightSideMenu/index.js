import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { HamburgerMenuIcon, FullPageMenu } from './components';

const MobileMenu = ({ menuIsOpen, toggleMenu }) => (
    <MobileRightSideMenu menuIsOpen={menuIsOpen}>
        <HamburgerMenuIcon menuIsOpen={menuIsOpen} toggleMenu={toggleMenu} />
        <FullPageMenu menuIsOpen={menuIsOpen} toggleMenu={toggleMenu} />
    </MobileRightSideMenu>
);

MobileMenu.propTypes = {
    menuIsOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired
};

export default MobileMenu;

const MobileRightSideMenu = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    width: 60px;
    height: 100%;
    z-index: ${({ menuIsOpen }) => (menuIsOpen ? 21 : 'inherit')};
    @media (${({ theme }) => theme.breakpoints.mobileNav}) {
        display: none;
    }
`;
