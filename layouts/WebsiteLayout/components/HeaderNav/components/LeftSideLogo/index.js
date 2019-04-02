import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import { Transition, animated } from 'react-spring/renderprops.cjs';
import StyledLogo from '../StyledLink';

const LeftSideLogo = ({ menuIsOpen, toggleMenu, showBio }) => (
  <LogoProfileContainer menuIsOpen={menuIsOpen}>
    <LogoProfile>
      <Link prefetch href="/">
        <Logo
          menuIsOpen={menuIsOpen}
          onClick={() => menuIsOpen && toggleMenu()}
        >
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
    </LogoProfile>
    <Transition
      native
      items={showBio && !menuIsOpen}
      initial={{ opacity: 0, height: '0px' }}
      from={{ opacity: 0, height: '0px' }}
      enter={{ opacity: 1, height: '400px' }}
      leave={{ opacity: 0, height: '0px' }}
    >
      {isOpen =>
        isOpen &&
        // eslint-disable-next-line react/prop-types
        (({ opacity, height }) => (
          <AnimatedContainer style={{ opacity, height }}>
            <AvatarImage src="/static/avatar.png" />
            <StyledLink href="https://github.com/tim-soft" target="__blank">
              GitHub: @tim-soft
            </StyledLink>
            <StyledLink href="mailto:timellenberger@gmail.com">
              Email: Click to view
            </StyledLink>
            <BioParagraph>
              I create super fast web apps with React and GraphQL
            </BioParagraph>
            {/* Emoji found with https://emojipedia.org/ */}
            <BioParagraph>
              Made with{' '}
              <span role="img" aria-label="love">
                💚
              </span>{' '}
              in Seattle
            </BioParagraph>
          </AnimatedContainer>
        ))
      }
    </Transition>
  </LogoProfileContainer>
);

LeftSideLogo.propTypes = {
  menuIsOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  showBio: PropTypes.bool.isRequired
};

export default LeftSideLogo;

const BioParagraph = styled.div`
  color: white;
  margin: 10px;
  line-height: 21px;
  text-align: center;
  margin-top: auto;
`;

const StyledLink = styled.a`
  color: white;
  text-decoration: none;
  margin: 10px;
`;

const AvatarImage = styled.img`
  width: 90px;
  border-radius: 50%;
  margin: 20px;
`;

const LogoProfile = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 5px;
  width: 100%;
  height: inherit;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

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
  height: 60px;
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
  @media (max-width: 400px) {
    font-size: 2em;
  }
  @media (max-width: 350px) {
    font-size: 1.9em;
  }
`;

const AnimatedContainer = animated(styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  padding-top: 66px;
  border-radius: 2%;
  background-color: #1a1a1aba;
  @media (max-width: 420px) {
    width: calc(100% - 10px);
    border-radius: 0;
  }
`);

const LogoProfileContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ menuIsOpen }) => (menuIsOpen ? 22 : 'inherit')};
  width: 300px;
  padding: 10px;

  @media (max-width: 420px) {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    ${Logo} {
      align-self: flex-start;
    }
    ${LogoProfile} {
      max-width: 256px;
      padding: 15px 5px;
    }
    ${AnimatedContainer} {
      width: calc(100% - 10px);
      border-radius: 0;
    }
  }
`;
