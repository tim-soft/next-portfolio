import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ProjectBadge, ProjectBadgeList } from 'components/Portfolio';

const LibraryBanner = ({ library }) => (
  <BannerContainer>
    <LibraryName>{library.name}</LibraryName>
    <ProjectBadgeList style={{ textAlign: 'center' }}>
      {library.badges.map(({ badgeUrl, linkUrl }) => (
        <ProjectBadge key={badgeUrl} badgeUrl={badgeUrl} linkUrl={linkUrl} />
      ))}
    </ProjectBadgeList>
    <p>{library.href}</p>
    <p>{library.description}</p>
  </BannerContainer>
);

LibraryBanner.propTypes = {
  library: PropTypes.shape({
    href: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    badges: PropTypes.arrayOf(
      PropTypes.shape({
        badgeUrl: PropTypes.string.isRequired,
        linkUrl: PropTypes.string.isRequired
      })
    )
  }).isRequired
};

export default LibraryBanner;

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  background: ${({ theme }) => theme.pageBackgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 8px;
`;

const LibraryName = styled.h1`
  font-size: 50px;
  text-align: center;
`;
