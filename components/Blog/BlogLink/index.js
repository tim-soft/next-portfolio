import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Link from 'next/link';

/**
 * A styled link component which accepts internal and external links
 *
 * If given an external link, the url will load in a new tab.
 * Optionally include the `paragraph` prop to inherit styling.
 */
const BlogLink = ({ href, children, className, ...props }) => {
  if (href.charAt(0) === '/')
    return (
      <Link href={href}>
        <StyledLink className={className} {...props}>
          {children}
        </StyledLink>
      </Link>
    );

  return (
    <StyledLink className={className} href={href} target="_blank" {...props}>
      {children}
    </StyledLink>
  );
};

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
  direction: ${({ rtl }) => (rtl ? 'rtl' : 'inherit')};
  text-decoration: underline;
  transition: color 0.2s linear;
  color: ${({ theme }) => theme.pageContentFontColor};
  font-weight: bold;
  font-size: 1.2em;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.pageContentLinkHoverColor};
  }
  ${({ paragraph }) =>
    paragraph &&
    css`
      font-size: inherit;
      font-weight: inherit;
    `}
`;
