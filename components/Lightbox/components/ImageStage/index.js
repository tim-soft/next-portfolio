/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImagePager from './components/ImagePager';
import ArrowButton from './components/ArrowButton';

const ImageStage = ({
  images,
  currentIndex,
  onClickPrev,
  onClickNext,
  onClose
}) => {
  // Extra sanity check that the next/prev image exists before moving to it
  const canPrev = currentIndex > 0;
  const canNext = currentIndex + 1 < images.length;
  const prev = () => canPrev && onClickPrev();
  const next = () => canNext && onClickNext();

  return (
    <ImageContainer>
      <ArrowButton onClick={prev} position="left" disabled={!canPrev} />

      <ImagePager
        images={images}
        currentIndex={currentIndex}
        onClose={onClose}
        onClickNext={next}
        onClickPrev={prev}
      />

      <ArrowButton onClick={next} position="right" disabled={!canNext} />
    </ImageContainer>
  );
};

ImageStage.propTypes = {
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

export default ImageStage;

const ImageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: url('https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png')
      39 39,
    auto;
`;
