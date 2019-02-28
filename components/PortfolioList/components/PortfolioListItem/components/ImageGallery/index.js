import React from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

export default class ImageGallery extends React.Component {
  static propTypes = {
    projectTitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        width: PropTypes.number,
        height: PropTypes.number
      })
    ).isRequired
  };

  constructor() {
    super();

    this.state = { currentImage: 0 };
  }

  openLightbox = (event, obj) => {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true
    });
  };

  closeLightbox = () => {
    this.setState({
      currentImage: 0,
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
    const { photos } = this.props;

    return (
      <div>
        <Gallery photos={photos} onClick={this.openLightbox} />
        <Lightbox
          images={photos}
          backdropClosesModal
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={currentImage}
          isOpen={lightboxIsOpen}
        />
      </div>
    );
  }
}
