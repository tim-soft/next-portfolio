/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ButtonControl from '../ButtonControl';
import ImagePager from './components/ImagePager';

const ImageStage = ({
  images,
  currentIndex,
  onClickPrev,
  onClickNext,
  onClose
}) => (
  <ImageContainer>
    <ArrowButton
      onClick={() => currentIndex > 0 && onClickPrev()}
      type="button"
      left
    >
      <IoIosArrowBack />
    </ArrowButton>

    <ImagePager
      images={images}
      currentIndex={currentIndex}
      onClose={onClose}
      onClickNext={onClickNext}
      onClickPrev={onClickPrev}
    />

    <ArrowButton
      onClick={() => currentIndex + 1 < images.length && onClickNext()}
      type="button"
      right
    >
      <IoIosArrowForward />
    </ArrowButton>
  </ImageContainer>
);

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

const ArrowButton = styled(ButtonControl)`
  position: absolute;
  left: ${({ left }) => (left ? 0 : 'unset')};
  right: ${({ right }) => (right ? 0 : 'unset')};
`;

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
