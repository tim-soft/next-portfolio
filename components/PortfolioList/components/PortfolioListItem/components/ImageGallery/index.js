import React from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-spring-lightbox';

export default class ImageGallery extends React.Component {
  static propTypes = {
    galleryTitle: PropTypes.string.isRequired,
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

  constructor() {
    super();

    this.state = { currentImage: 0, lightboxIsOpen: false };
  }

  openLightbox = (event, obj) => {
    this.setState({
      currentImage: obj.index,
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

  render() {
    const { currentImage, lightboxIsOpen } = this.state;
    const { images, galleryTitle } = this.props;

    return (
      <>
        <Gallery photos={images} onClick={this.openLightbox} margin={3} />
        <Lightbox
          isOpen={lightboxIsOpen}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          images={images}
          currentIndex={currentImage}
          galleryTitle={galleryTitle}
        />
      </>
    );
  }
}
