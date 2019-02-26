import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Spring, config } from 'react-spring/renderprops.cjs';

const HamburgerMenuIcon = ({ menuIsOpen, toggleMenu }) => (
  <StyledSVG
    viewBox="0 0 96 96"
    height="2em"
    onClick={() => toggleMenu()}
    style={{
      height: '100%',
      overflow: 'visible',
      cursor: 'pointer',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)'
    }}
  >
    <Spring
      to={{ x: menuIsOpen ? 1 : 0, y: menuIsOpen ? 0 : 1 }}
      config={config.wobbly}
    >
      {({ x, y }) => (
        <g
          id="navicon"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line
            transform={`translate(${x * 12}, ${x * -7}) rotate(${x *
              45}, 7, 26)`}
            x1="7"
            y1="26"
            x2="89"
            y2="26"
          />
          <line
            transform={`translate(${x * 12}, ${x * 7}) rotate(${x *
              -45}, 7, 70)`}
            x1="7"
            y1="70"
            x2="89"
            y2="70"
          />
          <line
            transform={`translate(${x * -96})`}
            opacity={y}
            x1="7"
            y1="48"
            x2="89"
            y2="48"
          />
        </g>
      )}
    </Spring>
  </StyledSVG>
);

HamburgerMenuIcon.propTypes = {
  menuIsOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired
};

const StyledSVG = styled.svg`
  height: 100%;
  overflow: visible;
  cursor: pointer;
  z-index: inherit;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

export default HamburgerMenuIcon;
