import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import BlogData from 'data/BlogPosts';
import BlogLink from '../BlogLink';
import DateAndDuration from '../DateAndDuration';

const BlogArticleBanner = ({ router }) => {
  const currHref = router.route;

  // Get index of current blog post
  const blogPost = BlogData.find(post => post.href === currHref);

  return (
    <BannerContainer>
      <AvatarImage src="/static/avatar.png" alt="avatar" />
      <StyledBlogLink href="/blog">&#10226; Go Back</StyledBlogLink>
      {blogPost && (
        <>
          <Title>{blogPost.title}</Title>
          <PublishDate>
            <DateAndDuration
              date={blogPost.date}
              readTime={blogPost.readTime}
            />
          </PublishDate>
        </>
      )}
    </BannerContainer>
  );
};

export default withRouter(BlogArticleBanner);

BlogArticleBanner.propTypes = {
  router: PropTypes.shape({
    route: PropTypes.string.isRequired
  }).isRequired
};

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: calc(900px - 25px * 2);
  background: ${({ theme }) => theme.pageBackgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 8px;
`;

const StyledBlogLink = styled(BlogLink)`
  position: absolute;
  right: 0;
  top: 15px;
`;

const AvatarImage = styled.img`
  width: 90px;
  border-radius: 50%;
  margin: 20px 0;
`;

const Title = styled.h1`
  font-weight: normal;
`;

const PublishDate = styled.h4`
  font-weight: normal;
`;
