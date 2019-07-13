import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { TiArrowBackOutline } from 'react-icons/ti';
import BlogData from 'data/BlogPosts';
import BlogLink from '../BlogLink';
import DateAndDuration from '../DateAndDuration';

const BlogArticleBanner = ({ router }) => {
  const currHref = router.route;

  // Get index of current blog post
  const blogPost = BlogData.find(post => post.href === currHref);

  return (
    <BannerContainer>
      {blogPost && (
        <>
          <BlogLogo src={blogPost.logo} alt="Article Logo" />
          <StyledBlogLink href="/blog">
            <TiArrowBackOutline /> Go Back
          </StyledBlogLink>
          <Title>{blogPost.title}</Title>
          <BlogMeta>
            <AvatarImage src="/static/avatar.png" alt="Avatar" />
            <PublishDate>
              <DateAndDuration
                date={blogPost.date}
                readTime={blogPost.readTime}
              />
              <BlogLink paragraph href="/">
                <span style={{ display: 'block', margin: '3px 0 0 0' }}>
                  Tim Ellenberger
                </span>
              </BlogLink>
            </PublishDate>
          </BlogMeta>
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

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5em;
  margin-bottom: 1.5em;
`;

const AvatarImage = styled.img`
  height: 55px;
  border-radius: 50%;
  margin-right: 10px;
`;

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
  text-decoration: none;
  font-weight: normal;
  display: flex;
  align-items: center;
  svg {
    margin-right: 3px;
  }
`;

const BlogLogo = styled.img`
  height: 120px;
  margin: 1.5em 0;
`;

const Title = styled.h1`
  transition: color 0.2s linear;
  font-weight: normal;
  margin: 0;
  text-align: center;
  font-size: 2.5em;
  @media only screen and (max-width: 600px) {
    font-size: 2.2em;
  }
`;

const PublishDate = styled.span`
  transition: color 0.2s linear;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
