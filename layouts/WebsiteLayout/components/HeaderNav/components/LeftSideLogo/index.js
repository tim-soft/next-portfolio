import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import { Transition, animated } from 'react-spring/renderprops.cjs';
import StyledLogo from '../StyledLink';

const LeftSideLogo = ({ menuIsOpen, toggleMenu, showBio }) => (
  <LogoProfileContainer
    showBio={showBio && !menuIsOpen}
    menuIsOpen={menuIsOpen}
  >
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
            <animated.div
              style={{
                opacity,
                height,
                position: 'relative',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
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
            </animated.div>
          ))
        }
      </Transition>
    </LogoProfile>
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
  position: relative;
  width: 100%;
  height: 100%;
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

const LogoProfileContainer = styled.div`
  position: fixed;
  z-index: ${({ menuIsOpen }) => (menuIsOpen ? 21 : 'inherit')};
  width: 300px;
  top: 15px;
  transition: background-color 0.3s linear;
  background-color: ${({ showBio }) => (showBio ? '#1a1a1aba' : 'unset')};
  padding: 10px;
  border-radius: 2%;

  @media (max-width: 420px) {
    width: calc(100%);
    top: 0;
    left: 0;
    right: 0;
    ${Logo} {
      align-self: flex-start;
    }
  }
`;
