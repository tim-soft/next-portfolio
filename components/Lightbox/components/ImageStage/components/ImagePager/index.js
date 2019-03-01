/* eslint-disable no-shadow */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useSprings, animated } from 'react-spring';
import { useGesture } from 'react-with-gesture';
import styled from 'styled-components';

const ImagePager = ({ images, onClose }) => {
  const index = useRef(0);

  const [props, set] = useSprings(images.length, i => ({
    x: i * window.innerWidth,
    sc: 1,
    display: 'block'
  }));

  const clamp = (num, clamp, higher) => {
    const nextIndex = higher
      ? Math.min(Math.max(num, clamp), higher)
      : Math.min(num, clamp);

    // const currentIndex = index.current;

    // if (currentIndex > nextIndex) onClickPrev();
    // if (currentIndex < nextIndex) onClickNext();
    // console.log({ currentIndex: index.current, nextIndex });

    return nextIndex;
  };

  const bind = useGesture(
    ({ down, delta: [xDelta], direction: [xDir], distance, cancel }) => {
      if (down && distance > window.innerWidth / 3)
        cancel(
          (index.current = clamp(
            index.current + (xDir > 0 ? -1 : 1),
            0,
            images.length - 1
          ))
        );
      set(i => {
        if (i < index.current - 1 && i > index.current + 1)
          return { display: 'none' };
        const x = (i - index.current) * window.innerWidth + (down ? xDelta : 0);
        const sc = down ? 1 - distance / window.innerWidth / 3 : 1;
        return { x, sc, display: 'block' };
      });
    }
  );
  return props.map(({ x, display, sc }, i) => (
    <animated.div
      {...bind()}
      // eslint-disable-next-line react/no-array-index-key
      key={i}
      style={{
        display,
        transform: x.interpolate(x => `translate3d(${x}px,0,0)`),
        position: 'absolute',
        width: '100%',
        height: '100%',
        willChange: 'transform',
        userSelect: 'none'
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
        onClick={() => {
          // If the background is clicked and a drag isn't happening
          // close the lightbox
          if (sc.getValue() === 1) onClose();
        }}
      >
        <Image
          src={images[i].src}
          alt={images[i].alt}
          draggable="false"
          onClick={e => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          }}
        />
      </animated.div>
    </animated.div>
  ));
};

ImagePager.propTypes = {
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

export default ImagePager;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  user-select: none;
  box-shadow: 0 22px 70px 4px rgba(0, 0, 0, 0.56);
`;
