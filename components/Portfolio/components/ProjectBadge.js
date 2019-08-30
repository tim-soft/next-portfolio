import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProjectBadge = ({ badgeUrl, linkUrl }) => (
  <BadgeLink href={linkUrl} target="_blank" rel="noopener noreferrer">
    <img src={badgeUrl} alt="badge" height="100%" />
  </BadgeLink>
);

ProjectBadge.propTypes = {
  badgeUrl: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired
};

export default ProjectBadge;

const BadgeLink = styled.a`
  margin-right: 5px;
  display: inline-block;
  height: 23px;
`;
