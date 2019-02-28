import React from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-photo-gallery';
import Lightbox from 'components/Lightbox';

export default class ImageGallery extends React.Component {
  static propTypes = {
    projectTitle: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(
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

    this.setState({
      currentImage: currentImage - 1
    });
  };

  gotoNext = () => {
    const { currentImage } = this.state;

    this.setState({
      currentImage: currentImage + 1
    });
  };

  render() {
    const { currentImage, lightboxIsOpen } = this.state;
    const { photos, projectTitle } = this.props;

    return (
      <>
        <Gallery photos={photos} onClick={this.openLightbox} margin={3} />

        <Lightbox
          isOpen={lightboxIsOpen}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          images={photos}
          currentIndex={currentImage}
          projectTitle={projectTitle}
        />
      </>
    );
  }
}
