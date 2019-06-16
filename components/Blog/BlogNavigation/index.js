import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'next/router';
import { getSortedPosts } from 'data/BlogPosts';
import BlogLink from '../BlogLink';

const BlogNavigation = ({ router }) => {
  const currHref = router.route;

  // Get blog posts, sorted oldest to newest
  const sortedPosts = getSortedPosts({ order: 'asc' });

  // Get index of current blog post
  const currPostIndex = sortedPosts.findIndex(post => post.href === currHref);

  // Get prev post
  const PrevPost = () => {
    if (currPostIndex > 0) {
      const prevPost = sortedPosts[currPostIndex - 1];
      return (
        <NavLink prefetch href={prevPost.href}>
          &#10229; {prevPost.title}
        </NavLink>
      );
    }

    return <span />;
  };

  // Get next post
  const NextPost = () => {
    if (currPostIndex < sortedPosts.length - 1) {
      const nextPost = sortedPosts[currPostIndex + 1];
      return (
        <NavLink prefetch href={nextPost.href} rtl>
          &#10230; {nextPost.title}
        </NavLink>
      );
    }

    return <span />;
  };

  return (
    <NavContainer>
      <PrevPost />
      <NextPost />
    </NavContainer>
  );
};

BlogNavigation.propTypes = {
  router: PropTypes.shape({
    route: PropTypes.string.isRequired
  }).isRequired
};

export default withRouter(BlogNavigation);

const NavContainer = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 1em 0;
`;

const NavLink = styled(BlogLink)`
  width: 45%;
  text-decoration: none;
  ::first-line {
    text-decoration: overline;
  }
`;
