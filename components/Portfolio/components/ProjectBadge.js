import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProjectBadge = ({ badgeUrl, linkUrl }) => (
  <BadgeLink
    onClick={e => e.stopPropagation()}
    href={linkUrl}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={badgeUrl} alt="badge" height="100%" />
  </BadgeLink>
);

ProjectBadge.propTypes = {
  badgeUrl: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired
};

export default ProjectBadge;

const BadgeLink = styled.a`
  transition: border-color 0.2s linear !important;
  margin-right: 3px;
  display: inline-block;
  height: 23px;
  border-style: solid;
  border-width: 1px;
  border-color: transparent;
  :hover {
    border-color: ${({ theme }) => theme.pageContentLinkHoverColor};
  }
`;
