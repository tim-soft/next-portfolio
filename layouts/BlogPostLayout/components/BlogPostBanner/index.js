import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TiArrowBackOutline } from 'react-icons/ti';
import { BlogLink, DateAndDuration } from 'components/Blog';

const BlogPostBanner = ({ blogPost }) => (
  <BannerContainer>
    <BlogLogo src={blogPost.logo} alt="Article Logo" />
    <StyledBlogLink href="/blog">
      <TiArrowBackOutline /> Go Back
    </StyledBlogLink>
    <Title>{blogPost.title}</Title>
    <BlogMeta>
      <AvatarImage src="/static/avatar.png" alt="Avatar" />
      <PublishDate>
        <DateAndDuration date={blogPost.date} readTime={blogPost.readTime} />
        <BlogLink paragraph href="/">
          <span style={{ display: 'block', margin: '3px 0 0 0' }}>
            Tim Ellenberger
          </span>
        </BlogLink>
      </PublishDate>
    </BlogMeta>
  </BannerContainer>
);

BlogPostBanner.propTypes = {
  blogPost: PropTypes.shape({
    href: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    readTime: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired
  }).isRequired
};

export default BlogPostBanner;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5em 0;
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
