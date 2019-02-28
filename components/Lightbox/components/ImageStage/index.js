import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ButtonControl from '../ButtonControl';

const ImageStage = ({ images, currentIndex, onClickPrev, onClickNext }) => (
  <ImageContainer>
    <ArrowButton
      onClick={() => currentIndex > 0 && onClickPrev()}
      type="button"
      left
    >
      <IoIosArrowBack />
    </ArrowButton>
    <Image src={images[currentIndex].src} alt={images[currentIndex].alt} />
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

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const ImageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
