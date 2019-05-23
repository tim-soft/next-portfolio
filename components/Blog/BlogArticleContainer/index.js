import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageScrollWrapper from 'components/PageScrollWrapper';
import BlogArticleBanner from '../BlogArticleBanner';
import BlogNavigation from '../BlogNavigation';

const BlogArticleContainer = ({ children }) => (
  <PageScrollWrapper>
    <Container>
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
  ]).isRequired
};

export default BlogArticleContainer;

const Container = styled.main`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.5em;
`;
