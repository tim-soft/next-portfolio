import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSpring, animated, to } from 'react-spring';
import { useGesture } from 'react-use-gesture';

/**
 * Animate pinch/zoom on image
 *
 * https://github.com/react-spring/react-use-gesture
 * https://github.com/react-spring/react-spring
 */
const Image = ({
  src,
  alt,
  isCurrentImage,
  toggleControls,
  setDisableDrag
}) => {
  const imageRef = useRef();
  const defaultImageTransform = () => ({
    scale: 1,
    translateX: 0,
    translateY: 0
  });

  const [{ scale, translateX, translateY }, set] = useSpring(() => ({
    ...defaultImageTransform(),
    onFrame: f => {
      if (f.scale < 1 || !f.pinching) {
        set(defaultImageTransform);
        setDisableDrag(false);
      }
    }
  }));

  // Reset scale of this image when switching to new image
  useEffect(() => {
    if (!isCurrentImage) set(defaultImageTransform);
  });

  // Animate current page and adjacent pages during drag
  const bind = useGesture(
    {
      onPinch: ({
        delta: [deltaDist],
        origin: [touchOriginX, touchOriginY]
      }) => {
        const pinchScale = scale.value + deltaDist * 0.004;
        const pinchDelta = pinchScale - scale.value;

        const {
          top: imageTopLeftY,
          left: imageTopLeftX,
          width: imageWidth,
          height: imageHeight
        } = imageRef.current.getBoundingClientRect();

        // Get the (x,y) touch position relative to image origin at the current scale
        const imageCoordX =
          (touchOriginX - imageTopLeftX - imageWidth / 2) / scale.value;
        const imageCoordY =
          (touchOriginY - imageTopLeftY - imageHeight / 2) / scale.value;

        // Calculate translateX/Y offset at the next scale to zoom to touch position
        const newTransformX = -imageCoordX * pinchDelta + translateX.value;
        const newTransformY = -imageCoordY * pinchDelta + translateY.value;

        // Restrict the amount of zoom between half and 3x image size
        if (pinchScale < 0.5) set({ scale: 0.5, pinching: true });
        else if (pinchScale > 3.0) set({ scale: 3.0, pinching: true });
        else
          set({
            scale: pinchScale,
            translateX: newTransformX,
            translateY: newTransformY,
            pinching: true
          });
      },
      onPinchEnd: () => {
        if (scale.value > 1) setDisableDrag(true);
        else {
          setDisableDrag(false);
          set(defaultImageTransform);
        }
      },
      onDrag: ({ delta: [xDelta, yDelta], pinching }) => {
        if (pinching || scale.value <= 1) return;
        set({
          translateX: translateX.value + xDelta / 3,
          translateY: translateY.value + yDelta / 3
        });
      },
      onDragEnd: () => {
        if (scale.value <= 1) set(defaultImageTransform);
      }
    },
    /**
     * useGesture config
     * https://github.com/react-spring/react-use-gesture#usegesture-config
     */
    { domTarget: imageRef }
  );

  return (
    <AnimatedImage
      {...bind()}
      ref={imageRef}
      style={{
        transform: to(
          [scale, translateX, translateY],
          (s, x, y) => `translate(${x}px, ${y}px) scale(${s})`
        )
      }}
      isCurrentImage={isCurrentImage}
      src={src}
      alt={alt}
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
        toggleControls();
      }}
    />
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  isCurrentImage: PropTypes.bool.isRequired,
  toggleControls: PropTypes.func.isRequired,
  setDisableDrag: PropTypes.func.isRequired
};

export default Image;

const AnimatedImage = animated(styled.img`
  width: auto;
  max-height: 100%;
  max-width: 100%;
  user-select: none;
  will-change: ${({ isCurrentImage }) =>
    isCurrentImage ? 'transform' : 'unset'};
`);
