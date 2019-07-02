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
        <HorizontalRule />
        {children}
        <HorizontalRule />
        <BlogNavigation />
        <a href="mailto:timellenberger@gmail.com">
          <HiringCallout>Need a developer? Drop me a line!</HiringCallout>
        </a>
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

const HiringCallout = styled.h2`
  transition: color 0.2s linear;
  font-size: 1.2em;
  font-weight: normal;
  text-align: center;
  color: ${({ theme }) => theme.pageContentLinkHoverColor};
  text-decoration: underline;
  margin: 2em 0 1em 0;
  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.pageContentFontColor};
  }
`;

const HorizontalRule = styled.hr`
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    ${({ theme }) => theme.pageContentFontColor},
    rgba(0, 0, 0, 0)
  );
  /* background-color: ${({ theme }) => theme.pageContentFontColor}; */
  margin: 2em 0;
`;

const Container = styled.main`
  color: ${({ theme }) => theme.pageContentFontColor};
  width: 100%;
  max-width: ${({ theme, width }) => width || theme.pageContentWidth}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.5em;
  article {
    width: inherit;
  }
`;
