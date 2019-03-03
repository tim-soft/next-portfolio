/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Transition, animated } from 'react-spring/renderprops.cjs';
import ButtonControl from '../../../ButtonControl';

const ArrowButton = ({ position, onClick, disabled }) => {
  return (
    <Transition
      native
      items={!disabled}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
    >
      {disabled =>
        disabled &&
        // eslint-disable-next-line react/prop-types
        (({ opacity }) => (
          <animated.div
            style={{ opacity, ...(opacity === 1 && { display: 'none' }) }}
          >
            <Button position={position} type="button" onClick={onClick}>
              {position === 'left' && <IoIosArrowBack />}
              {position === 'right' && <IoIosArrowForward />}
            </Button>
          </animated.div>
        ))
      }
    </Transition>
  );
};

ArrowButton.propTypes = {
  position: PropTypes.oneOf(['left', 'right']).isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

ArrowButton.defaultProps = {
  disabled: false
};

export default ArrowButton;

const Button = styled(ButtonControl)`
  position: absolute;
  left: ${({ position }) => (position === 'left' ? 0 : 'unset')};
  right: ${({ position }) => (position === 'right' ? 0 : 'unset')};
`;
