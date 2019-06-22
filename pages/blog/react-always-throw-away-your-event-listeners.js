import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import {
  BlogParagraph,
  BlogLink,
  BlogCodeBlock,
  BlogArticleContainer,
  BlogSEO
} from 'components/Blog';
import { generatePageTheme } from 'components/AppTheme';

import WindowSizeReporter from 'components/ArticleComponents/WindowSizeReporter';

const BlogPage = ({ baseUrl, theme }) => (
  <>
    <BlogSEO baseUrl={baseUrl} />
    <ThemeProvider theme={theme}>
      <BlogArticleContainer>
        <BlogParagraph>
          Unlike your React components, the event listeners they&apos;ve created
          don&apos;t magically disappear after their UI unmounts from the DOM.
          Undisposed event listeners will linger in your browser to haunt future
          components.
        </BlogParagraph>
        <BlogParagraph>
          Let&apos;s say you wanted to create a simple component that displays
          the <strong>instantaneous</strong> window width.
        </BlogParagraph>
        <BlogParagraph>
          The first step is to create a function for setting some component
          state we&apos;ll call{' '}
          <strong>
            <code>windowWidth</code>
          </strong>
          , then create a{' '}
          <BlogLink
            href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener"
            paragraph
          >
            window event listener
          </BlogLink>{' '}
          in the React lifecycle method{' '}
          <strong>
            <code>componentDidMount()</code>
          </strong>{' '}
          with our new setter function as a{' '}
          <strong>
            <code>callback</code>
          </strong>
          .
        </BlogParagraph>
        <BlogCodeBlock
          language="jsx"
          code={`
state = {
  windowWidth: null
};

componentDidMount() {
  // Measure the initial screen width
  this.updateWindowSize();

  // If the screen width changes, update component state
  window.addEventListener('resize', this.updateWindowSize);
}

updateWindowSize = () =>
  this.setState({
    windowWidth: window.innerWidth
  });
      `}
        />
        <BlogParagraph>
          When the component first mounts,{' '}
          <strong>
            <code>updateWindowSize()</code>
          </strong>{' '}
          is called directly. As the window size changes, the event listener
          we&apos;ve created will call the same function as a callback.
        </BlogParagraph>
        <BlogParagraph>
          Before the current component unmounts, our event listener must be
          removed from the{' '}
          <strong>
            <code>global Window object</code>
          </strong>{' '}
          by utilizing the React lifecycle method{' '}
          <strong>
            <code>componentWillUnmount()</code>
          </strong>
          .
        </BlogParagraph>
        <BlogParagraph>
          All together the code is quite simple, but can save you from a lot of
          potential headaches. Try resizing your browser window to see the code
          in action.
        </BlogParagraph>
        <BlogCodeBlock
          language="jsx"
          title={
            <h2 style={{ fontSize: '1.5em', margin: '1.4em' }}>
              <span role="img" aria-label="Hooray">
                🎉
              </span>
              {` `}
              <WindowSizeReporter />
              {` `}
              <span role="img" aria-label="Hooray">
                🎉
              </span>
            </h2>
          }
          path="/components/WindowSizeReporter.js"
          code={`
import React from 'react';

class WindowSizeReporter extends React.Component {
  state = {
    windowWidth: null
  };

  componentDidMount() {
    // Measure the initial screen width
    this.updateWindowSize();

    // If the screen width changes, update component state
    window.addEventListener('resize', this.updateWindowSize);
  }

  componentWillUnmount() {
    // Remove resize event listener from window
    window.removeEventListener('resize', this.updateWindowSize);
  }

  updateWindowSize = () =>
    this.setState({
      windowWidth: window.innerWidth
    });

  render() {
    const { windowWidth } = this.state;

    return <span>Your window width is {windowWidth}</span>;
  }
}

export default WindowSizeReporter;
      `}
        />
      </BlogArticleContainer>
    </ThemeProvider>
  </>
);

BlogPage.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  theme: PropTypes.object
};

BlogPage.defaultProps = {
  theme: {}
};

// Get URL and generate page theme
BlogPage.getInitialProps = async ({ req }) => {
  const hostname = req ? req.headers.host : window.location.hostname;
  const protocol = hostname.includes('localhost') ? 'http' : 'https';
  const theme = generatePageTheme({
    fontColor: '#e2e5ec',
    highlightFontColor: 'aquamarine',
    backgroundColor: '#101010'
  });

  return { baseUrl: `${protocol}/${hostname}`, theme };
};

export default BlogPage;
