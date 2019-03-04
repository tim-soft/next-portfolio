/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Gesture } from 'react-with-gesture';
import { Spring, animated } from 'react-spring/renderprops.cjs';

class ImagePager extends React.Component {
  static propTypes = {
    toggleControls: PropTypes.func.isRequired,
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

  constructor() {
    super();

    this.state = {
      /* Maintain accurate measure of window width, even during resize events */
      windowWidth: window.innerWidth
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth);
  }

  updateWindowWidth = () => this.setState({ windowWidth: window.innerWidth });

  // Determine whether to slide to next or previous image
  clamp = (num, clamp, higher) => {
    const { currentIndex, onClickPrev, onClickNext } = this.props;

    const nextIndex = higher
      ? Math.min(Math.max(num, clamp), higher)
      : Math.min(num, clamp);

    if (currentIndex > nextIndex) onClickPrev();
    else if (currentIndex < nextIndex) onClickNext();
  };

  render() {
    const { images, currentIndex, onClose, toggleControls } = this.props;
    const { windowWidth } = this.state;

    return images.map((image, i) => (
      <Gesture key={i}>
        {({
          down,
          delta: [xDelta],
          direction: [xDir],
          distance,
          cancel,
          velocity
        }) => {
          const clickNotDrag = i === currentIndex && xDelta === 0;

          // Animate over to the next image if it has been dragged far enough or fast enough
          if (
            currentIndex === i &&
            down &&
            (distance > windowWidth / 3 || velocity > 3.0)
          ) {
            cancel(
              this.clamp(
                currentIndex + (xDir > 0 ? -1 : 1),
                0,
                images.length - 1
              )
            );
          }

          let gestureConfig = {};

          // Hide image if not the current image
          if (i < currentIndex - 1 && i > currentIndex + 1)
            gestureConfig = { display: 'none' };
          else {
            // Update current image position
            const x = (i - currentIndex) * windowWidth + (down ? xDelta : 0);
            const sc = down ? 1 - distance / windowWidth / 1.9 : 1;

            gestureConfig = { x, sc, display: 'block' };
          }

          return (
            <Spring
              native
              to={{
                x: (i - currentIndex) * windowWidth,
                sc: 1,
                display: 'block',
                ...gestureConfig
              }}
            >
              {({ x, display, sc }) => (
                <animated.div
                  style={{
                    display,
                    transform: x.interpolate(x => `translate3d(${x}px,0,0)`),
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    willChange: 'transform',
                    userSelect: 'none',
                    touchAction: 'none'
                  }}
                >
                  <animated.div
                    style={{
                      transform: sc.interpolate(s => `scale(${s})`),
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      willChange: 'transform',
                      userSelect: 'none'
                    }}
                    // If the background is clicked close the lightbox
                    onClick={() => {
                      if (clickNotDrag) onClose();
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      draggable="false"
                      onDragStart={e => {
                        // Disable image ghost dragging in firefox
                        e.preventDefault();
                      }}
                      onClick={e => {
                        // Don't close lighbox when clicking image
                        e.stopPropagation();
                        e.nativeEvent.stopImmediatePropagation();

                        // Show/Hide controls when image is clicked
                        if (clickNotDrag) toggleControls();
                      }}
                    />
                  </animated.div>
                </animated.div>
              )}
            </Spring>
          );
        }}
      </Gesture>
    ));
  }
}

export default ImagePager;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  user-select: none;
  box-shadow: 0 22px 70px 4px rgba(0, 0, 0, 0.56);
`;
