import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';

const BlogArticleBanner = ({ title, publishDate }) => (
  <BannerContainer>
    <AvatarImage src="/static/avatar.png" alt="avatar" />
    <Link href="/blog">
      <StyledLink>Go Back</StyledLink>
    </Link>

    <Title>{title}</Title>
    <PublishDate>{publishDate}</PublishDate>
  </BannerContainer>
);

export default BlogArticleBanner;

BlogArticleBanner.propTypes = {
  title: PropTypes.string.isRequired,
  publishDate: PropTypes.string.isRequired
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

const StyledLink = styled.a`
  position: absolute;
  right: 0;
  top: 15px;
  text-decoration: none;
  transition: color 0.2s linear;
  :hover {
    cursor: pointer;
    color: cyan;
  }
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
