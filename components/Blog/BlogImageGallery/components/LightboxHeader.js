import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Transition, animated } from 'react-spring';
import { IoIosClose } from 'react-icons/io';
import Color from 'color';
import ButtonControl from './LightboxButtonControl';

const LightboxHeader = ({
  controlsAreHidden,
  galleryTitle,
  images,
  currentIndex,
  onClose
}) => (
  <Transition
    native
    items={!controlsAreHidden}
    initial={{ opacity: 1, transform: 'translate(0,0)' }}
    from={{ opacity: 0, transform: 'translate(0,-40px)' }}
    enter={{ opacity: 1, transform: 'translate(0,0)' }}
    leave={{ opacity: 0, transform: 'translate(0,-40px)' }}
  >
    {showHeader =>
      showHeader &&
      (animStyles => (
        <AnimatedContainer style={animStyles}>
          <TopHeaderBar>
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
          </TopHeaderBar>
        </AnimatedContainer>
      ))
    }
  </Transition>
);

LightboxHeader.propTypes = {
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

export default LightboxHeader;

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
`;

const CloseButton = styled(ButtonControl)`
  height: 100%;
  display: flex;
  border-left-style: solid;
  border-left-width: 3px;
  border-left-color: ${({ theme }) => theme.headerNavFontColor};
  color: inherit;
`;

const LeftSideDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left-width: 3px;
  border-left-color: ${({ theme }) => theme.pageContentLinkHoverColor};
  border-left-style: solid;
  padding: 8px 0 8px 10px;
`;

const TopHeaderBar = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 10px 2px 10px 20px;
  color: ${({ theme }) => theme.headerNavFontColor};
  background-color: ${({ theme }) =>
    Color(theme.pageBackgroundColor)
      .alpha(0.5)
      .hsl()
      .string()};
  > * {
    height: inherit;
  }
`;

const AnimatedContainer = animated(styled.div`
  will-change: opacity, transform;
  z-index: 10;
  cursor: auto;
`);
