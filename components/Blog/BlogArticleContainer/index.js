import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageScrollWrapper from 'components/PageScrollWrapper';
import BlogArticleBanner from '../BlogArticleBanner';
import BlogNavigation from '../BlogNavigation';

const BlogArticleContainer = ({ children, width }) => (
  <PageScrollWrapper>
    <Container width={width}>
      <article>
        <header>
          <BlogArticleBanner />
          <BlogNavigation />
        </header>
        {children}
        <BlogNavigation />
      </article>
    </Container>
  </PageScrollWrapper>
);

BlogArticleContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  width: PropTypes.number
};

BlogArticleContainer.defaultProps = {
  width: null
};

export default BlogArticleContainer;

const Container = styled.main`
  color: ${({ theme }) => theme.pageContentFontColor};
  width: 100%;
  max-width: ${({ theme, width }) => width || theme.blogArticleWidth}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.5em;
`;
