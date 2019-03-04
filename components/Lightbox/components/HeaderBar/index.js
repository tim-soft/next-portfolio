/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IoIosClose } from 'react-icons/io';
import { Transition, animated } from 'react-spring/renderprops.cjs';
import ButtonControl from '../ButtonControl';

const HeaderBar = ({
  projectTitle,
  images,
  currentIndex,
  onClose,
  controlsAreHidden
}) => (
  <Transition
    native
    items={!controlsAreHidden}
    // initial={{ opacity: 1, transform: 'translate(0,-40px)' }}
    from={{ opacity: 0, transform: 'translate(0,-40px)' }}
    enter={{ opacity: 1, transform: 'translate(0,0)' }}
    leave={{ opacity: 0, transform: 'translate(0,-40px)' }}
  >
    {controlsAreHidden =>
      controlsAreHidden &&
      // eslint-disable-next-line react/prop-types
      (({ opacity, transform }) => (
        <animated.div
          style={{
            opacity,
            transform,
            ...(opacity === 1 && { display: 'none' }),
            zIndex: 10,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          <FixedHeaderBar>
            <LeftSideDescriptionContainer>
              <h2>{projectTitle}</h2>
              <h4>{images[currentIndex].caption}</h4>
            </LeftSideDescriptionContainer>

            <CloseButton onClick={onClose} type="button">
              <IoIosClose size={60} />
            </CloseButton>
          </FixedHeaderBar>
        </animated.div>
      ))
    }
  </Transition>
);

HeaderBar.propTypes = {
  controlsAreHidden: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  projectTitle: PropTypes.string.isRequired,
  currentIndex: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      width: PropTypes.number,
      height: PropTypes.number
    })
  ).isRequired
};

export default HeaderBar;

const CloseButton = styled(ButtonControl)`
  height: 100%;
`;

const LeftSideDescriptionContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-direction: column;
  height: 100%;
  h2,
  h4 {
    margin: 0;
    font-weight: normal;
  }
`;

const FixedHeaderBar = styled.header`
  height: 60px;
  /* background: rgba(25, 25, 25, 0.36); */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  color: white;
`;
