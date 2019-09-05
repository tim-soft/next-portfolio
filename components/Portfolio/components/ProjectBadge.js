import { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const ProjectBadge = ({ badgeUrl, linkUrl, ...props }) => {
  const [isLoaded, setLoaded] = useState(false);

  return (
    <BadgeLink
      onClick={e => e.stopPropagation()}
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      <BadgeImage
        src={badgeUrl}
        alt="badge"
        isLoaded={isLoaded}
        onLoad={() => setLoaded(true)}
      />
    </BadgeLink>
  );
};

ProjectBadge.propTypes = {
  badgeUrl: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired
};

export default ProjectBadge;

const BadgeImage = styled.img`
  height: 100%;
  min-height: initial;
  ${({ isLoaded }) =>
    isLoaded &&
    css`
      animation-name: fadeInOpacity;
      animation-iteration-count: 1;
      animation-timing-function: ease-in;
      animation-duration: 0.2s;

      @keyframes fadeInOpacity {
        0% {
          opacity: 0;
          transform: scale(0);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
    `}
`;

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
