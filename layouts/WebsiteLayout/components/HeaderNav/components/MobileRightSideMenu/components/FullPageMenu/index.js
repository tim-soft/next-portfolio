import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Spring } from 'react-spring/renderprops.cjs';
import Link from 'next/link';
import Scrollbar from 'components/Scrollbar';
import StyledLink from '../../../StyledLink';

const FullPageMenu = ({ menuIsOpen, toggleMenu }) => (
  <Spring to={{ opacity: menuIsOpen ? 1 : 0 }}>
    {({ opacity }) => (
      <MenuContainer opacity={opacity}>
        <StyledScrollbar
          contentProps={{
            renderer: props => {
              // eslint-disable-next-line react/prop-types
              const { elementRef, style, ...restProps } = props;
              return (
                <span
                  {...restProps}
                  style={{
                    ...style,
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                  ref={elementRef}
                  className="Content"
                />
              );
            }
          }}
        >
          <ScrollbarContentContainer>
            <Link prefetch href="/">
              <MobileStyledLink onClick={toggleMenu}>
                <LinkHeading>Home</LinkHeading>
              </MobileStyledLink>
            </Link>

            <Link prefetch href="/portfolio">
              <MobileStyledLink onClick={toggleMenu}>
                <LinkHeading>Portfolio</LinkHeading>
              </MobileStyledLink>
            </Link>

            <Link prefetch href="/particles">
              <MobileStyledLink onClick={toggleMenu}>
                <LinkHeading>ParticlesGL</LinkHeading>
              </MobileStyledLink>
            </Link>

            <Link prefetch href="/courses">
              <MobileStyledLink onClick={toggleMenu}>
                <LinkHeading>Courses</LinkHeading>
              </MobileStyledLink>
            </Link>

            <Link prefetch href="/blog">
              <MobileStyledLink onClick={toggleMenu}>
                <LinkHeading>Blog</LinkHeading>
              </MobileStyledLink>
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

const LinkHeading = styled.h1`
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
`;

const ScrollbarContentContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-height: 100%;
`;

const StyledScrollbar = styled(Scrollbar)`
  height: calc(100vh - 90px) !important;
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
