import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { Spring, config, animated, interpolate } from 'react-spring';

const HamburgerMenuIcon = ({ menuIsOpen, toggleMenu, theme }) => (
  <StyledSVG viewBox="0 0 96 96" height="2em" onClick={() => toggleMenu()}>
    <Spring
      native
      to={{
        x: menuIsOpen ? 1 : 0,
        y: menuIsOpen ? 0 : 1,
        strokeColor: menuIsOpen
          ? theme.headerNavMobileMenuFontColor
          : theme.headerNavHamburgerIconColor
      }}
      config={config.wobbly}
    >
      {({ x, y, strokeColor }) => (
        <animated.g
          id="navicon"
          fill="none"
          stroke={strokeColor}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animated.line
            transform={interpolate(
              [x],
              xCoord =>
                `translate(${xCoord * 12}, ${xCoord * -7}) rotate(${xCoord *
                  45}, 7, 26)`
            )}
            x1="7"
            y1="26"
            x2="89"
            y2="26"
          />
          <animated.line
            transform={interpolate(
              [x],
              xCoord =>
                `translate(${xCoord * 12}, ${xCoord * 7}) rotate(${xCoord *
                  -45}, 7, 70)`
            )}
            x1="7"
            y1="70"
            x2="89"
            y2="70"
          />
          <animated.line
            transform={interpolate([x], xCoord => `translate(${xCoord * -96})`)}
            opacity={y}
            x1="7"
            y1="48"
            x2="89"
            y2="48"
          />
        </animated.g>
      )}
    </Spring>
  </StyledSVG>
);

HamburgerMenuIcon.propTypes = {
  menuIsOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  /* App theme variables from styled-components <ThemeProvider /> */
  theme: PropTypes.shape({
    headerNavHamburgerIconColor: PropTypes.string.isRequired,
    headerNavMobileMenuFontColor: PropTypes.string.isRequired
  }).isRequired
};

const StyledSVG = styled.svg`
  position: relative;
  height: 100%;
  overflow: visible;
  cursor: pointer;
  z-index: inherit;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

/**
 * The withTheme HOC adds any parent <ThemeProvider /> theme variables as props
 *
 * https://www.styled-components.com/docs/advanced#getting-the-theme-without-styled-components
 */
export default withTheme(HamburgerMenuIcon);
