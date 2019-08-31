import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageScrollWrapper from 'components/PageScrollWrapper';
import HiringCallout from 'components/HiringCallout';
import libraries from 'data/Libraries';
import { LibraryBanner } from './components';

const LibraryLayout = ({ route, children, width }) => {
  // Get the current blog post from data
  const library = libraries.find(lib => route.endsWith(lib.name));

  return (
    <>
      {/* <BlogPostSEO route={route} blogPost={blogPost} /> */}
      <PageScrollWrapper>
        <Container width={width}>
          <article>
            <header>
              <LibraryBanner library={library} />
            </header>
            <HorizontalRule />
            {children}
            <HorizontalRule />
            <HiringCallout />
          </article>
          {/* <BlogEditPostFAB route={route} /> */}
        </Container>
      </PageScrollWrapper>
    </>
  );
};

LibraryLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  route: PropTypes.string.isRequired,
  width: PropTypes.number
};

LibraryLayout.defaultProps = {
  width: null
};

export default LibraryLayout;

const HorizontalRule = styled.hr`
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    ${({ theme }) => theme.pageContentFontColor},
    rgba(0, 0, 0, 0)
  );
  margin: 2em 0;
`;

const Container = styled.main`
  color: ${({ theme }) => theme.pageContentFontColor};
  width: 100%;
  /* max-width: ${({ theme, width }) => width || theme.pageContentWidth}px; */
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.5em;
  article {
    width: inherit;
  }
  a {
    transition: color 0.2s linear;
    color: ${({ theme }) => theme.pageContentFontColor};
    :hover {
      color: ${({ theme }) => theme.pageContentLinkHoverColor};
    }
  }
`;
