import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Link from 'next/link';

/**
 * A styled link component which accepts internal and external links
 *
 * If given an external link, the url will load in a new tab.
 * Optionally include the `paragraph` prop to inherit styling.
 */
const BlogLink = ({ prefetch, href, children, className, ...props }) => {
  if (href.charAt(0) === '/')
    return (
      <Link href={href} prefetch={prefetch}>
        <StyledLink className={className} {...props}>
          {children}
        </StyledLink>
      </Link>
    );

  // External links should open in a new tab by default
  return (
    <StyledLink
      className={className}
      href={href}
      target="_blank"
      rel="noopener"
      {...props}
    >
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
  className: PropTypes.string,
  inverted: PropTypes.bool,
  paragraph: PropTypes.bool,
  prefetch: PropTypes.bool,
  noWrap: PropTypes.bool
};

BlogLink.defaultProps = {
  className: null,
  inverted: true,
  paragraph: null,
  prefetch: false,
  noWrap: false
};

export default BlogLink;

const StyledLink = styled.a`
  direction: ${({ rtl }) => (rtl ? 'rtl' : 'inherit')};
  text-decoration: underline;
  transition: color 0.2s linear;
  color: ${({ theme, inverted }) =>
    inverted ? theme.pageContentLinkHoverColor : theme.pageContentFontColor};
  font-weight: bold;
  font-size: 1.2em;
  cursor: pointer;
  :hover {
    color: ${({ theme, inverted }) =>
      inverted ? theme.pageContentFontColor : theme.pageContentLinkHoverColor};
  }
  ${({ noWrap }) => noWrap && `white-space: nowrap;`}
  ${({ paragraph }) =>
    paragraph &&
    css`
      font-size: inherit;
      font-weight: inherit;
    `}
`;
