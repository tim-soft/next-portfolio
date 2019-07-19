/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Transition, animated, to } from 'react-spring';
import Color from 'color';

const Page = ({ children, isOpen }) => (
  <Transition
    native
    items={isOpen}
    from={{
      opacity: 0,
      translateY: 0,
      scale: 0.75
    }}
    enter={{ opacity: 1, translateY: 1, scale: 1 }}
    leave={{
      opacity: 0,
      translateY: 0,
      scale: 0.75
    }}
    config={{ mass: 1, tension: 320, friction: 32 }}
  >
    {isOpen =>
      isOpen &&
      // eslint-disable-next-line react/prop-types
      (({ opacity, translateY, scale }) => (
        <AnimatedContainer
          style={{
            opacity,
            transform: to(
              [translateY, scale],
              (translateY, scale) =>
                `scale(${scale}) translate3d(0, ${translateY}px, 0)`
            )
          }}
        >
          {children}
        </AnimatedContainer>
      ))
    }
  </Transition>
);

Page.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired
};

export default Page;

const AnimatedContainer = animated(styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 400;
  background: ${({ theme }) =>
    Color(theme.accentColor)
      .alpha(0.95)
      .hsl()
      .string()};
  cursor: url('/static/touch-cursor.png') 39 39, auto;
`);
