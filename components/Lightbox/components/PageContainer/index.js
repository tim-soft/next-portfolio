/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Transition, animated } from 'react-spring/renderprops.cjs';

const Page = ({ children, isOpen }) => (
  <Transition
    native
    items={isOpen}
    from={{
      opacity: 0,
      transform: 'scale(0.85) translate3d(0px, 40px, 0px)'
    }}
    enter={{ opacity: 1, transform: 'scale(1) translate3d(0px, 0px, 0px)' }}
    leave={{
      opacity: 0,
      transform: 'scale(0.85) translate3d(0px, 40px, 0px)'
    }}
    config={{ mass: 1, tension: 320, friction: 32 }}
  >
    {isOpen =>
      isOpen &&
      (props => (
        <animated.div
          style={{
            ...props,
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
