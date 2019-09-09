import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageScrollWrapper from 'components/PageScrollWrapper';
import HiringCallout from 'components/HiringCallout';
import libraries from 'data/Libraries';
import { LibraryBanner, LibrarySEO } from './components';
import EditFAB from '../BlogPostLayout/components/BlogEditPostFAB';

const LibraryLayout = ({ route, children, width }) => {
  // Get the current blog post from data
  const library = libraries.find(lib => route.endsWith(lib.name));

  return (
    <>
      <LibrarySEO library={library} route={route} />
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
          <EditFAB route={route} />
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
    section {
      margin: 3em 0;
      h2 {
        font-size: 2em;
      }
    }
  }
  p, aside {
    font-size: 1.2em;
    line-height: 1.5em;
  }
`;
