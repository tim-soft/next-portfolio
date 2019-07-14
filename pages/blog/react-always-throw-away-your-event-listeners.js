import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import {
  BlogParagraph,
  BlogLink,
  BlogCodeBlock,
  BlogArticleContainer,
  BlogSEO,
  BlogQuote,
  BlogCodeInline
} from 'components/Blog';
import { darkTheme } from 'components/AppTheme';

import WindowSizeReporter from 'components/ArticleComponents/WindowSizeReporter';

const BlogPage = ({ route, theme }) => (
  <>
    <BlogSEO />
    <ThemeProvider theme={theme}>
      <BlogArticleContainer route={route}>
        <BlogParagraph>
          Unlike your React components, the event listeners they&apos;ve created
          don&apos;t magically disappear after their UI unmounts from the DOM.
          Undisposed event listeners will linger in your browser to haunt future
          components. Be afraid.
        </BlogParagraph>
        <BlogParagraph>
          For example, let&apos;s say you want to create a simple component that
          displays the <strong>instantaneous</strong> window width.
        </BlogParagraph>
        <BlogParagraph>
          The first step is to create a function for setting some component
          state we&apos;ll call{' '}
          <strong>
            <BlogCodeInline>windowWidth</BlogCodeInline>
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
            <BlogCodeInline>componentDidMount()</BlogCodeInline>
          </strong>{' '}
          with our new setter function as a{' '}
          <strong>
            <BlogCodeInline>callback</BlogCodeInline>
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
            <BlogCodeInline>updateWindowSize()</BlogCodeInline>
          </strong>{' '}
          is called directly. As the window size changes, the event listener
          we&apos;ve created calls the same function as a callback.
        </BlogParagraph>
        <BlogParagraph>
          Before the current component unmounts, our event listener must be
          removed from the{' '}
          <strong>
            <BlogCodeInline>global Window object</BlogCodeInline>
          </strong>{' '}
          by utilizing the React lifecycle method{' '}
          <strong>
            <code>componentWillUnmount()</code>
          </strong>
          .
        </BlogParagraph>
        <BlogParagraph>
          All together the code is quite simple and can save you from a lot of
          potential headaches.
        </BlogParagraph>
        <BlogQuote>
          Try resizing your browser window to see the code in action.
        </BlogQuote>
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
  route: PropTypes.string.isRequired,
  theme: PropTypes.object
};

BlogPage.defaultProps = {
  theme: {}
};

// Override default app theme for this page
BlogPage.pageTheme = darkTheme;

export default BlogPage;
