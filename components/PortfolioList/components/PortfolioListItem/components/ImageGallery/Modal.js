/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Transition, animated } from 'react-spring/renderprops.cjs';
import { IconContext } from 'react-icons';
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from 'react-icons/io';

const Lightbox = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onClickPrev,
  onClickNext,
  projectTitle
}) => (
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
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 400
          }}
        >
          <ContentContainer>
            <HeaderBar>
              <HeaderDescriptionContainer>
                <h2>{projectTitle}</h2>
                <h4>{images[currentIndex].caption}</h4>
              </HeaderDescriptionContainer>
              <IconContext.Provider value={{ size: '2em' }}>
                <CloseButton onClick={onClose} type="button">
                  <IoIosClose />
                </CloseButton>
              </IconContext.Provider>
            </HeaderBar>
            <ImageContainer>
              <ArrowButton
                onClick={() => currentIndex > 0 && onClickPrev()}
                type="button"
                left
              >
                <IoIosArrowBack />
              </ArrowButton>
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
              />
              <ArrowButton
                onClick={() =>
                  currentIndex + 1 < images.length && onClickNext()
                }
                type="button"
                right
              >
                <IoIosArrowForward />
              </ArrowButton>
            </ImageContainer>
            <FooterBar />
          </ContentContainer>
        </animated.div>
      ))
    }
  </Transition>
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

const HeaderDescriptionContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-direction: column;
  height: 100%;
  h2,
  h4 {
    margin: 0;
  }
`;

const IconButton = styled.button`
  background: none;
  border-style: none;
  font-size: 50px;
  cursor: pointer;
  padding: 0;
  margin: 0;
  color: white;
  transition: color 0.2s linear;
  :hover {
    color: grey;
  }
  :focus {
    outline: none;
  }
`;

const CloseButton = styled(IconButton)``;

const ArrowButton = styled(IconButton)`
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

const HeaderBar = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  color: white;
`;

const FooterBar = styled.header`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
`;

const ContentContainer = styled.div`
  background: rgba(0, 0, 0, 0.7);
  height: 100%;
  width: 100%;
`;
