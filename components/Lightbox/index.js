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

  constructor(props) {
    super(props);

    this.state = {
      controlsAreHidden: false
    };
  }

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
      projectTitle
    } = this.props;

    const { controlsAreHidden } = this.state;

    return (
      <CreatePortal>
        <PageContainer isOpen={isOpen}>
          <HeaderBar
            projectTitle={projectTitle}
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
