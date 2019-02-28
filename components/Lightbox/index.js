/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Transition, animated } from 'react-spring/renderprops.cjs';
import CreatePortal from 'components/CreatePortal';
import {
  HeaderBar,
  ImageStage,
  PageContainer
} from 'components/Lightbox/components';

const Lightbox = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onClickPrev,
  onClickNext,
  projectTitle
}) => (
  <CreatePortal>
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
            <PageContainer>
              <HeaderBar
                projectTitle={projectTitle}
                images={images}
                currentIndex={currentIndex}
                onClose={onClose}
              />
              <ImageStage
                images={images}
                currentIndex={currentIndex}
                onClickPrev={onClickPrev}
                onClickNext={onClickNext}
              />
            </PageContainer>
          </animated.div>
        ))
      }
    </Transition>
  </CreatePortal>
);

Lightbox.propTypes = {
  projectTitle: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onClickPrev: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
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

export default Lightbox;
