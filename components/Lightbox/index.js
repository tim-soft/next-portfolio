import React from 'react';
import PropTypes from 'prop-types';
import CreatePortal from 'components/CreatePortal';
import {
  HeaderBar,
  ImageStage,
  PageContainer
} from 'components/Lightbox/components';

const Lightbox = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onClickPrev,
  onClickNext,
  projectTitle
}) => (
  <CreatePortal>
    <PageContainer isOpen={isOpen}>
      <HeaderBar
        projectTitle={projectTitle}
        images={images}
        currentIndex={currentIndex}
        onClose={onClose}
      />
      <ImageStage
        images={images}
        onClose={onClose}
        currentIndex={currentIndex}
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
      />
    </PageContainer>
  </CreatePortal>
);

Lightbox.propTypes = {
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

export default Lightbox;
