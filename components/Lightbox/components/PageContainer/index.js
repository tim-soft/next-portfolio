/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Transition, animated, interpolate } from 'react-spring';

const Page = ({ children, isOpen }) => (
  <Transition
    native
    items={isOpen}
    from={{
      opacity: 0,
      translateY: 0,
      scale: 0.85
    }}
    enter={{ opacity: 1, translateY: 1, scale: 1 }}
    leave={{
      opacity: 0,
      translateY: 0,
      scale: 0.85
    }}
    config={{ mass: 1, tension: 320, friction: 32 }}
  >
    {isOpen =>
      isOpen &&
      // eslint-disable-next-line react/prop-types
      (({ opacity, translateY, scale }) => (
        <animated.div
          style={{
            opacity,
            transform: interpolate(
              [translateY, scale],
              (translateY, scale) =>
                `scale(${scale}) translate3d(0, ${translateY}px, 0)`
            ),
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 400
          }}
        >
          <PageContainer>{children}</PageContainer>
        </animated.div>
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

const PageContainer = styled.div`
  background: rgba(68, 68, 68, 0.94);
  height: 100%;
  width: 100%;
`;
