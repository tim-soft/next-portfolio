import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImageGallery from './components/ImageGallery';

const PortfolioListItem = ({ projectTitle, photos, description }) => (
  <PortfolioListItemContainer>
    <div>
      <ProjectTitle>{projectTitle}</ProjectTitle>
      <ProjectDescription>{description}</ProjectDescription>
    </div>

    <GalleryContainer>
      <ImageGallery photos={photos} />
    </GalleryContainer>
  </PortfolioListItemContainer>
);

PortfolioListItem.propTypes = {
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

export default PortfolioListItem;

const mobileBreakpoint = '1000px';

const GalleryContainer = styled.div`
  max-width: 700px;
`;

const ProjectDescription = styled.div`
  max-width: 700px;
  margin-right: 25px;
  @media (max-width: ${mobileBreakpoint}) {
    margin-right: 0;
    margin-bottom: 25px;
  }
`;

const ProjectTitle = styled.h2`
  margin-top: 0;
`;

const PortfolioListItemContainer = styled.li`
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: black;
  margin: 30px 0;
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
  @media (max-width: ${mobileBreakpoint}) {
    flex-direction: column;
    align-items: center;
  }
`;
