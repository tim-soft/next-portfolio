import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Spring, animated, to } from 'react-spring';
import Link from 'next/link';
import { GoMarkGithub, GoMail } from 'react-icons/go';
import Scrollbar from 'components/Scrollbar';
import StyledLink from '../../../StyledLink';

const FullPageMenu = ({ menuIsOpen, toggleMenu }) => (
  <Spring native to={{ opacity: menuIsOpen ? 1 : 0 }}>
    {({ opacity }) => (
      <MenuContainer
        style={{
          opacity,
          display: to([opacity], x => (x === 0 ? 'none' : 'flex'))
        }}
      >
        <Scrollbar
          contentProps={{
            // eslint-disable-next-line react/prop-types
            renderer: ({ elementRef, style, ...restProps }) => (
              <ScrollbarContent
                {...restProps}
                style={{
                  ...style,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column'
                }}
                ref={elementRef}
              />
            )
          }}
        >
          <NavMenuContainer>
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
          </NavMenuContainer>
          <MenuFooterContainer>
            <MenuFooter>
              <MenuFooterLink
                href="https://github.com/tim-soft"
                target="__blank"
              >
                <GoMarkGithub size="1.1em" />
                <FooterLinkText>@tim-soft</FooterLinkText>
              </MenuFooterLink>
              <MenuFooterLink href="mailto:timellenberger@gmail.com" right>
                <GoMail size="1.1em" />
                <FooterLinkText>@gmail</FooterLinkText>
              </MenuFooterLink>
            </MenuFooter>
          </MenuFooterContainer>
        </Scrollbar>
      </MenuContainer>
    )}
  </Spring>
);

FullPageMenu.propTypes = {
  menuIsOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired
};

export default FullPageMenu;

const ScrollbarContent = styled.div`
  &[style] {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const LinkHeading = styled.h1`
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
`;

const NavMenuContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-height: 100%;
  margin: auto;
`;

const MenuContainer = animated(styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: #1d1e1f;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  padding-top: 90px;
`);

const MobileStyledLink = styled(StyledLink)`
  margin: 20px 20px;
  padding: 15px 0;
  h1 {
    font-size: inherit;
    font-weight: normal;
    margin: 0;
  }
  color: ${({ theme }) => theme.headerNavMobileMenuFontColor};
`;

const MenuFooterContainer = styled.div`
  width: 100%;
  margin: auto 0 0 0;
  padding: 10px 0;
  background: ${({ theme }) => theme.pageBackgroundColor};
`;

const MenuFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const FooterLinkText = styled.h2`
  font-weight: normal;
  font-size: 0.5em;
  margin: ${({ right }) => (right ? '0 0 5px 0' : '0 0 0 5px')};
`;

const MenuFooterLink = styled(StyledLink)`
  color: ${({ theme }) => theme.pageContentLinkHoverColor};
  :hover {
    color: ${({ theme }) => theme.pageContentFontColor};
  }
  ::before {
    background-color: ${({ theme }) => theme.pageContentFontColor};
  }
  display: flex;
  align-items: center;
  text-decoration: none;
  margin: 0 20px;
`;
