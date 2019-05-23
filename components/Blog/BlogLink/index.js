import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

const BlogLink = ({ href, children, className }) => (
  <Link href={href}>
    <StyledLink className={className}>{children}</StyledLink>
  </Link>
);

BlogLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string
};

BlogLink.defaultProps = {
  className: null
};

export default BlogLink;

const StyledLink = styled.a`
  text-decoration: underline;
  transition: color 0.2s linear;
  color: black;
  font-weight: bold;
  font-size: 1.2em;
  :hover {
    cursor: pointer;
    color: cyan;
  }
`;
