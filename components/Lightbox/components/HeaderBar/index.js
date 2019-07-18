/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IoIosClose } from 'react-icons/io';
import { Transition, animated } from 'react-spring';
import ButtonControl from '../ButtonControl';

const HeaderBar = ({
  galleryTitle,
  images,
  currentIndex,
  onClose,
  controlsAreHidden
}) => (
  <Transition
    native
    items={!controlsAreHidden}
    initial={{ opacity: 1, transform: 'translate(0,0)' }}
    from={{ opacity: 0, transform: 'translate(0,-40px)' }}
    enter={{ opacity: 1, transform: 'translate(0,0)' }}
    leave={{ opacity: 0, transform: 'translate(0,-40px)' }}
  >
    {controlsAreHidden =>
      controlsAreHidden &&
      // eslint-disable-next-line react/prop-types
      (({ opacity, transform }) => (
        <AnimatedContainer
          style={{
            opacity,
            transform,
            ...(opacity === 1 && { display: 'none' })
          }}
        >
          <FixedHeaderBar>
            <LeftSideDescriptionContainer>
              <GalleryHeading>{galleryTitle}</GalleryHeading>
              <GallerySubheading>
                {images[currentIndex].caption}
              </GallerySubheading>
            </LeftSideDescriptionContainer>

            <RightSideContainer>
              <PageIndicator>
                {currentIndex + 1} / {images.length}
              </PageIndicator>
              <CloseButton onClick={onClose} type="button">
                <IoIosClose size={60} />
              </CloseButton>
            </RightSideContainer>
          </FixedHeaderBar>
        </AnimatedContainer>
      ))
    }
  </Transition>
);

HeaderBar.propTypes = {
  controlsAreHidden: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  galleryTitle: PropTypes.string.isRequired,
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

export default HeaderBar;

const GalleryHeading = styled.h2`
  margin: 0 0 5px 0;
  font-weight: normal;
`;

const GallerySubheading = styled.h4`
  margin: 0;
  font-weight: normal;
  color: ${({ theme }) => theme.pageContentLinkHoverColor};
`;

const PageIndicator = styled.span`
  white-space: nowrap;
  min-width: 60px;
  text-align: center;
`;

const RightSideContainer = styled.div`
  width: 117px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 20px;
`;

const CloseButton = styled(ButtonControl)`
  height: 100%;
  display: flex;
  border-left-style: solid;
  border-left-width: 2px;
  border-left-color: ${({ theme }) => theme.headerNavFontColor};
  color: inherit;
`;

const LeftSideDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left-width: 2px;
  border-left-color: ${({ theme }) => theme.pageContentLinkHoverColor};
  border-left-style: solid;
  padding: 8px 0 8px 10px;
`;

const FixedHeaderBar = styled.header`
  min-height: 70px;
  display: flex;
  justify-content: space-between;
  padding: 10px 2px 10px 20px;
  color: ${({ theme }) => theme.headerNavFontColor};
  > * {
    height: inherit;
  }
`;

const AnimatedContainer = animated(styled.div`
  will-change: opacity, transform;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  cursor: auto;
`);
