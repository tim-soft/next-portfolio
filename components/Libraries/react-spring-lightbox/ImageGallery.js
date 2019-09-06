import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Color from 'color';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-spring-lightbox';
import GridImage from '../../Blog/BlogImageGallery/components/GridImage';

class ImageGallery extends React.Component {
  static propTypes = {
    galleryTitle: PropTypes.string.isRequired,
    imageMasonryDirection: PropTypes.oneOf(['column', 'row']),
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        width: PropTypes.number,
        height: PropTypes.number
      })
    ).isRequired,
    LightboxHeader: PropTypes.element,
    LightboxFooter: PropTypes.element,
    LightboxArrowButton: PropTypes.element
  };

  static defaultProps = {
    imageMasonryDirection: 'column',
    LightboxHeader: null,
    LightboxFooter: null,
    LightboxArrowButton: null
  };

  constructor() {
    super();

    this.state = {
      currentImageIndex: 0,
      lightboxIsOpen: false,
      clientSide: false
    };
  }

  componentDidMount() {
    this.setState({ clientSide: true });
  }

  openLightbox = (e, { index }) => {
    this.setState({
      currentImageIndex: index,
      lightboxIsOpen: true
    });
  };

  closeLightbox = () => {
    this.setState({
      lightboxIsOpen: false
    });
  };

  gotoPrevious = () => {
    const { currentImageIndex } = this.state;

    // If the current image isn't the first in the list, go to the previous
    if (currentImageIndex > 0) {
      this.setState({
        currentImageIndex: currentImageIndex - 1
      });
    }
  };

  gotoNext = () => {
    const { images } = this.props;
    const { currentImageIndex } = this.state;

    // If the current image isn't the list in the list, go to the next
    if (currentImageIndex + 1 < images.length) {
      this.setState({
        currentImageIndex: currentImageIndex + 1
      });
    }
  };

  /**
   * Sets breakpoints for column width based on containerWidth
   *
   * @int containerWidth The current width of the image grid
   */
  columnConfig = containerWidth => {
    let columns = 1;
    if (containerWidth >= 500) columns = 2;
    if (containerWidth >= 900) columns = 3;
    if (containerWidth >= 1500) columns = 4;

    return columns;
  };

  render() {
    const { currentImageIndex, lightboxIsOpen, clientSide } = this.state;
    const {
      images,
      galleryTitle,
      imageMasonryDirection,
      LightboxHeader,
      LightboxFooter,
      LightboxArrowButton
    } = this.props;

    return (
      <GalleryContainer>
        {clientSide && (
          <Gallery
            columns={this.columnConfig}
            onClick={this.openLightbox}
            photos={images}
            margin={6}
            direction={imageMasonryDirection}
            renderImage={GridImage}
          />
        )}
        <StyledLightbox
          isOpen={lightboxIsOpen}
          onClose={this.closeLightbox}
          onPrev={this.gotoPrevious}
          onNext={this.gotoNext}
          images={images}
          currentIndex={currentImageIndex}
          renderHeader={() =>
            LightboxHeader &&
            React.cloneElement(LightboxHeader, {
              galleryTitle,
              images,
              currentIndex: currentImageIndex,
              onClose: this.closeLightbox
            })
          }
          renderFooter={() =>
            LightboxFooter &&
            React.cloneElement(LightboxFooter, {
              galleryTitle,
              images,
              currentIndex: currentImageIndex,
              onClose: this.closeLightbox
            })
          }
          renderPrevButton={({ canPrev }) =>
            LightboxArrowButton &&
            React.cloneElement(LightboxArrowButton, {
              position: 'left',
              onClick: this.gotoPrevious,
              disabled: !canPrev
            })
          }
          renderNextButton={({ canNext }) =>
            LightboxArrowButton &&
            React.cloneElement(LightboxArrowButton, {
              position: 'right',
              onClick: this.gotoNext,
              disabled: !canNext
            })
          }
        />
      </GalleryContainer>
    );
  }
}

export default ImageGallery;

const GalleryContainer = styled.div`
  margin: 2em 0;
`;

const StyledLightbox = styled(Lightbox)`
  background: ${({ theme }) =>
    Color(theme.accentColor)
      .alpha(0.95)
      .hsl()
      .string()};
  * ::selection {
    background: ${({ theme }) => theme.pageContentSelectionColor};
  }
  * ::-moz-selection {
    background: ${({ theme }) =>
      new Color(theme.pageContentSelectionColor).darken(0.57).hex()};
  }
`;
