import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IoIosClose } from 'react-icons/io';
import ButtonControl from '../ButtonControl';

const HeaderBar = ({ projectTitle, images, currentIndex, onClose }) => (
  <FixedHeaderBar>
    <LeftSideDescriptionContainer>
      <h2>{projectTitle}</h2>
      <h4>{images[currentIndex].caption}</h4>
    </LeftSideDescriptionContainer>

    <CloseButton onClick={onClose} type="button">
      <IoIosClose size={60} />
    </CloseButton>
  </FixedHeaderBar>
);

HeaderBar.propTypes = {
  onClose: PropTypes.func.isRequired,
  projectTitle: PropTypes.string.isRequired,
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

export default HeaderBar;

const CloseButton = styled(ButtonControl)`
  height: 100%;
`;

const LeftSideDescriptionContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-direction: column;
  height: 100%;
  h2,
  h4 {
    margin: 0;
    font-weight: normal;
  }
`;

const FixedHeaderBar = styled.header`
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  color: white;
`;
