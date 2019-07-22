/* eslint-disable react/no-array-index-key */
import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSprings, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import clamp from 'lodash.clamp';
import useWindowSize from '../../utils/useWindowSize';

/**
 * Gesture controlled surface that animates prev/next page changes via spring physics.
 *
 * https://github.com/react-spring/react-use-gesture
 * https://github.com/react-spring/react-spring
 */
const ImagePager = ({
  images,
  currentIndex,
  onClickPrev,
  onClickNext,
  toggleControls,
  onClose
}) => {
  const firstRender = useRef(true);
  const { width: pageWidth } = useWindowSize();

  // Generate page positions based on current index
  const getPagePositions = (i, down = false, xDelta = 0) => {
    const x = (i - currentIndex) * pageWidth + (down ? xDelta : 0);
    if (i < currentIndex - 1 || i > currentIndex + 1)
      return { x, display: 'none' };
    return { x, display: 'block' };
  };

  // Set the initial page positions
  const [props, set] = useSprings(images.length, getPagePositions);

  // Animate page change if currentIndex changes
  useEffect(() => {
    // No need to set page position for initial render
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Update page positions after prev/next page state change
    set(getPagePositions);
  });

  // Animate current page and adjacent pages during drag
  const bind = useGesture({
    onDrag: ({
      down,
      delta: [xDelta],
      direction: [xDir],
      velocity,
      distance,
      cancel
    }) => {
      const draggedFarEnough = down && distance > pageWidth / 3;
      const draggedFastEnough = down && velocity > 2.8;

      // Handle next/prev image from valid drag
      if (draggedFarEnough || draggedFastEnough) {
        const goToIndex = clamp(
          currentIndex + (xDir > 0 ? -1 : 1),
          0,
          images.length - 1
        );

        // Cancel gesture animation
        cancel();

        if (goToIndex > currentIndex) onClickNext();
        if (goToIndex < currentIndex) onClickPrev();
      }

      // Update page x-coordinates during gesture
      set(i => getPagePositions(i, down, xDelta));
    }
  });

  return props.map(({ x, display }, i) => (
    <AnimatedTranslate
      {...bind()}
      key={i}
      style={{
        display,
        transform: x.to(xInterp => `translate3d(${xInterp}px,0,0)`)
      }}
    >
      <PageContentContainer
        // If the background is clicked close the lightbox
        onClick={() => {
          if (x.value === 0) onClose();
        }}
      >
        <Image
          src={images[i].src}
          alt={images[i].alt}
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
            if (x.value === 0) toggleControls();
          }}
        />
      </PageContentContainer>
    </AnimatedTranslate>
  ));
};

ImagePager.propTypes = {
  toggleControls: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onClickPrev: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired
    })
  ).isRequired
};

export default ImagePager;

const PageContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  user-select: none;
  touch-action: none;
`;

const Image = styled.img`
  width: auto;
  max-height: 100%;
  max-width: 100%;
  user-select: none;
  box-shadow: 0 62.5px 125px -25px rgba(50, 50, 73, 0.5),
    0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6);
`;

const AnimatedTranslate = animated(styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  will-change: transform;
  touch-action: none;
`);
