import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GoMarkGithub } from 'react-icons/go';

const ProjectTitle = ({ text, href }) => (
  <Title>
    <ProjectLink href={href} target="_blank" rel="noopener noreferrer">
      {text}
      <GoMarkGithub size="1.5em" />
    </ProjectLink>
  </Title>
);

ProjectTitle.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
};

export default ProjectTitle;

const Title = styled.h2`
  display: flex;
  align-items: center;
  font-weight: normal;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  svg {
    margin-left: 0.5em;
  }
`;
