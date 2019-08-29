import PropTypes from 'prop-types';
import { GoMarkGithub } from 'react-icons/go';

const ProjectTitle = ({ text, href }) => (
  <h2 style={{ display: 'flex', alignItems: 'center', fontWeight: 'normal' }}>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        textDecoration: 'none'
      }}
    >
      {text}
      <GoMarkGithub size="1.5em" style={{ marginLeft: '0.5em' }} />
    </a>
  </h2>
);

ProjectTitle.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
};

export default ProjectTitle;
