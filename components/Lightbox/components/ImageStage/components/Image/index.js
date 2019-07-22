import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';

/**
 * Animate pinch/zoom on image
 *
 * https://github.com/react-spring/react-use-gesture
 * https://github.com/react-spring/react-spring
 */
const Image = ({ src, alt, isCurrentImage, toggleControls, ...restProps }) => {
  const [scale, setScale] = useState(1);
  const [immediate, setImmediate] = useState(false);

  // Reset scale of this image when switching to new image
  useEffect(() => {
    if (!isCurrentImage) {
      setImmediate(false);
      setScale(1);
    } else {
      setImmediate(true);
    }
  });

  const animStyles = useSpring({
    immediate,
    to: { transform: `scale(${scale})` }
  });

  // Animate current page and adjacent pages during drag
  const bind = useGesture({
    onPinch: ({ delta: [deltaDist] }) => {
      const pinchScale = scale + deltaDist * 0.0003;

      if (pinchScale < 0.5) setScale(0.5);
      else if (pinchScale > 3.0) setScale(3.0);
      else setScale(pinchScale);
    }
  });

  return (
    <AnimatedImage
      {...bind()}
      {...restProps}
      style={animStyles}
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
  toggleControls: PropTypes.func.isRequired
};

export default Image;

const AnimatedImage = animated(styled.img`
  width: auto;
  max-height: 100%;
  max-width: 100%;
  user-select: none;
  box-shadow: 0 62.5px 125px -25px rgba(50, 50, 73, 0.5),
    0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6);
`);
