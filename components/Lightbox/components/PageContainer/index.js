import PropTypes from 'prop-types';
import { useTransition, animated } from 'react-spring';

/**
 * Animates the lightbox as it opens/closes
 */
const PageContainer = ({ children, isOpen, className, style }) => {
  const transitions = useTransition(isOpen, null, {
    from: { transform: 'scale(0.75)', opacity: 0 },
    enter: { transform: 'scale(1)', opacity: 1 },
    leave: { transform: 'scale(0.75)', opacity: 0 },
    config: { mass: 1, tension: 320, friction: 32 }
  });

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div
          key={key}
          className={className}
          style={{
            ...props,
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            zIndex: 400,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            ...style
          }}
        >
          {children}
        </animated.div>
      )
  );
};

PageContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]).isRequired
};

export default PageContainer;
