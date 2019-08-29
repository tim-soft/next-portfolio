import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProjectBadge = ({ badgeUrl, linkUrl }) => (
  <BadgeLink
    href={linkUrl}
    target="_blank"
    rel="noopener noreferrer"
    style={{ marginRight: '0.5em' }}
  >
    <img src={badgeUrl} alt="badge" />
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
  height: 20px;
`;
