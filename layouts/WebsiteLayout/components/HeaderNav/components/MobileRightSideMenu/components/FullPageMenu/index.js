import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Spring } from 'react-spring/renderprops.cjs';
import Link from 'next/link';
import Scrollbar from 'react-scrollbars-custom';
import StyledLink from '../../../StyledLink';

const FullPageMenu = ({ menuIsOpen, toggleMenu }) => (
  <Spring to={{ opacity: menuIsOpen ? 1 : 0 }}>
    {({ opacity }) => (
      <MenuContainer opacity={opacity}>
        <StyledScrollbar
          trackYRenderer={({ elementRef, style, ...restProps }) => (
            <span
              {...restProps}
              style={{
                ...style,
                background: '#9E9E9E',
                width: '9px',
                height: '100%',
                top: 0
              }}
              ref={elementRef}
            />
          )}
        >
          <ScrollbarContentContainer>
            <Link prefetch href="/">
              <MobileStyledLink onClick={toggleMenu}>Home</MobileStyledLink>
            </Link>

            <Link prefetch href="/portfolio">
              <MobileStyledLink onClick={toggleMenu}>
                Portfolio
              </MobileStyledLink>
            </Link>

            <Link prefetch href="/particles">
              <MobileStyledLink onClick={toggleMenu}>
                ParticlesGL
              </MobileStyledLink>
            </Link>

            <Link prefetch href="/store">
              <MobileStyledLink onClick={toggleMenu}>Store</MobileStyledLink>
            </Link>

            <Link prefetch href="/blog">
              <MobileStyledLink onClick={toggleMenu}>Blog</MobileStyledLink>
            </Link>
          </ScrollbarContentContainer>
        </StyledScrollbar>
      </MenuContainer>
    )}
  </Spring>
);

FullPageMenu.propTypes = {
  menuIsOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired
};

export default FullPageMenu;

const ScrollbarContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100%;
`;

const StyledScrollbar = styled(Scrollbar)`
  width: 100%;
  height: calc(100% - 90px);
`;

const MenuContainer = styled.div.attrs(({ opacity }) => ({
  style: {
    opacity,
    // If mobile menu is closed, remove from DOM
    ...(opacity === 0 && { display: 'none' })
  }
}))`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: #1d1e1f;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
`;

const MobileStyledLink = styled(StyledLink)`
  margin: 20px 20px;
  padding: 15px 0;
  color: ${({ theme }) => theme.headerNavMobileMenuFontColor};
`;
