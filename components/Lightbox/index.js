import React from 'react';
import PropTypes from 'prop-types';
import CreatePortal from 'components/CreatePortal';
import {
  HeaderBar,
  ImageStage,
  PageContainer
} from 'components/Lightbox/components';

export default class Lightbox extends React.Component {
  static propTypes = {
    galleryTitle: PropTypes.string.isRequired,
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

  constructor(props) {
    super(props);

    this.state = {
      controlsAreHidden: false
    };
  }

  componentDidMount() {
    // Listen for keyboard events to control Lightbox
    document.addEventListener('keyup', this.handleKeyboardInput);
    document.addEventListener('keydown', this.preventBackgroundScroll);
  }

  componentWillUnmount() {
    // Remove event listeners when the component unmounts
    document.removeEventListener('keyup', this.handleKeyboardInput);
    document.removeEventListener('keydown', this.preventBackgroundScroll);
  }

  static getDerivedStateFromProps(props, state) {
    const { isOpen } = props;
    const { controlsAreHidden } = state;

    // Always display the controls when opening the lightbox
    if (!isOpen && controlsAreHidden) return { controlsAreHidden: false };
    return null;
  }

  /**
   * Prevent keyboard from controlling background page
   * when lightbox is open
   */
  preventBackgroundScroll = e => {
    const { isOpen } = this.props;
    const keysToIgnore = [
      'ArrowUp',
      'ArrowDown',
      'End',
      'Home',
      'PageUp',
      'PageDown'
    ];

    if (isOpen && keysToIgnore.includes(e.key)) e.preventDefault();
  };

  /**
   * Navigate images with arrow keys, close on Esc key
   */
  handleKeyboardInput = e => {
    const { isOpen, onClickPrev, onClickNext, onClose } = this.props;

    if (isOpen) {
      switch (e.key) {
        case 'ArrowLeft':
          onClickPrev();
          break;
        case 'ArrowRight':
          onClickNext();
          break;
        case 'Escape':
          onClose();
          break;
        default:
          e.preventDefault();
          break;
      }
    }
  };

  /**
   * Toggles whether the lightbox controls are hidden or not
   */
  toggleControls = () => {
    const { controlsAreHidden } = this.state;

    this.setState({ controlsAreHidden: !controlsAreHidden });
  };

  render() {
    const {
      isOpen,
      onClose,
      images,
      currentIndex,
      onClickPrev,
      onClickNext,
      galleryTitle
    } = this.props;

    const { controlsAreHidden } = this.state;

    return (
      <CreatePortal>
        <PageContainer isOpen={isOpen}>
          <HeaderBar
            galleryTitle={galleryTitle}
            images={images}
            currentIndex={currentIndex}
            onClose={onClose}
            controlsAreHidden={controlsAreHidden}
            toggleControls={this.toggleControls}
          />
          <ImageStage
            images={images}
            onClose={onClose}
            currentIndex={currentIndex}
            onClickPrev={onClickPrev}
            onClickNext={onClickNext}
            controlsAreHidden={controlsAreHidden}
            toggleControls={this.toggleControls}
          />
        </PageContainer>
      </CreatePortal>
    );
  }
}
