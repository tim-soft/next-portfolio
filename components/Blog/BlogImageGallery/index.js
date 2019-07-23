import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Gallery from 'react-photo-gallery';
import Lightbox from '../../Lightbox';
import GridImage from './components/GridImage';
import LightboxHeader from './components/LightboxHeader';
import LightboxArrowButton from './components/LightboxArrowButton';

class BlogImageGallery extends React.Component {
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
    ).isRequired
  };

  static defaultProps = {
    imageMasonryDirection: 'column'
  };

  constructor() {
    super();

    this.state = {
      currentImage: 0,
      lightboxIsOpen: false,
      clientSide: false
    };
  }

  componentDidMount() {
    this.setState({ clientSide: true });
  }

  openLightbox = (e, { index }) => {
    this.setState({
      currentImage: index,
      lightboxIsOpen: true
    });
  };

  closeLightbox = () => {
    this.setState({
      lightboxIsOpen: false
    });
  };

  gotoPrevious = () => {
    const { currentImage } = this.state;

    // If the current image isn't the first in the list, go to the previous
    if (currentImage > 0) {
      this.setState({
        currentImage: currentImage - 1
      });
    }
  };

  gotoNext = () => {
    const { images } = this.props;
    const { currentImage } = this.state;

    // If the current image isn't the list in the list, go to the next
    if (currentImage + 1 < images.length) {
      this.setState({
        currentImage: currentImage + 1
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
    const { currentImage, lightboxIsOpen, clientSide } = this.state;
    const { images, galleryTitle, imageMasonryDirection } = this.props;

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
        <Lightbox
          isOpen={lightboxIsOpen}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          images={images}
          currentIndex={currentImage}
          galleryTitle={galleryTitle}
          renderHeader={LightboxHeader}
          renderPagerButton={LightboxArrowButton}
        />
      </GalleryContainer>
    );
  }
}

export default BlogImageGallery;

const GalleryContainer = styled.section`
  margin: 2em 0;
`;
