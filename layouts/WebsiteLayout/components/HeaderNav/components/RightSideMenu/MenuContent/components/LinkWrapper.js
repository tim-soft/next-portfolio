import PropTypes from 'prop-types';
import Router from 'next/router';

const LinkWrapper = ({ href, children, ...props }) => {
  const handleClick = () => {
    if (href.charAt(0) === '/') Router.push(href);
    else window.open(href, '_blank');
  };

  return (
    <div
      role="button"
      onClick={handleClick}
      onKeyPress={handleClick}
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  );
};

LinkWrapper.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default LinkWrapper;
