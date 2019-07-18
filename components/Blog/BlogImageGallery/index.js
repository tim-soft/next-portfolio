import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Gallery from 'react-photo-gallery';
import Lightbox from 'components/Lightbox';

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

    this.state = { currentImage: 0, lightboxIsOpen: false, clientSide: false };
  }

  componentDidMount() {
    this.setState({ clientSide: true });
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
    const { currentImage, lightboxIsOpen, clientSide } = this.state;
    const { images, galleryTitle, imageMasonryDirection } = this.props;

    return (
      <GalleryContainer>
        {clientSide && (
          <Gallery
            photos={images}
            onClick={this.openLightbox}
            margin={3}
            direction={imageMasonryDirection}
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
        />
      </GalleryContainer>
    );
  }
}

export default BlogImageGallery;

const GalleryContainer = styled.section`
  margin: 2em 0;
`;
