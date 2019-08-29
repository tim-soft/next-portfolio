import PropTypes from 'prop-types';

const ProjectBadge = ({ badgeUrl, linkUrl }) => (
  <a
    href={linkUrl}
    target="_blank"
    rel="noopener noreferrer"
    style={{ marginRight: '0.5em' }}
  >
    <img src={badgeUrl} alt="badge" />
  </a>
);

ProjectBadge.propTypes = {
  badgeUrl: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired
};

export default ProjectBadge;
