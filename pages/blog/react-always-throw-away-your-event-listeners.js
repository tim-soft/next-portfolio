import React from 'react';
import NextSEO, { BlogJsonLd } from 'next-seo';
import {
  BlogParagraph,
  BlogLink,
  BlogCodeBlock,
  BlogArticleContainer
} from 'components/Blog';

import WindowSizeReporter from 'components/ArticleComponents/WindowSizeReporter';

const BlogPage = () => (
  <>
    <NextSEO
      config={{
        title: 'Coding, Musings and Adventures of Tim Ellenberger',
        openGraph: {
          title: 'Coding, Musings and Adventures of Tim Ellenberger'
        }
      }}
    />
    <BlogJsonLd
      url="https://timellenberger.now.sh/blog"
      title="Coding, Musings and Adventures of Tim Ellenberger"
      images={['https://timellenberger.now.sh/static/avatar.png']}
      datePublished="2019-03-31T08:00:00+08:00"
      dateModified="2019-03-31T09:00:00+08:00"
      authorName="Tim Ellenberger"
      description="Coding, Musings and Adventures of Tim Ellenberger"
    />
    <BlogArticleContainer>
      <BlogParagraph>
        Unlike your React components, the event listeners they&apos;ve created
        don&apos;t magically disappear after their UI unmounts from the DOM.
        Undisposed event listeners will linger in your browser to haunt future
        components.
      </BlogParagraph>
      <BlogParagraph>
        Let&apos;s say you wanted to create a simple component that displays the{' '}
        <strong>instantaneous</strong> window width.
      </BlogParagraph>
      <BlogParagraph>
        The first step is to create a function for setting some component state
        we&apos;ll call{' '}
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
        potential headaches. Try resizing your browser window to see the code in
        action.
      </BlogParagraph>
      <BlogCodeBlock
        language="jsx"
        title={<WindowSizeReporter />}
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
  </>
);

const fontColor = '#e2e5ec';
const highlightFontColor = 'aquamarine';
const backgroundColor = '#101010';

// _app.js level theme variable overrides
BlogPage.theme = {
  headerNavFontColor: fontColor,
  headerNavTextUnderlineColor: highlightFontColor,
  headerNavHoverFontColor: highlightFontColor,
  headerNavHamburgerIconColor: fontColor,
  pageBackgroundColor: backgroundColor,
  pageContentFontColor: fontColor,
  pageContentLinkHoverColor: highlightFontColor,
  popoutMenuBorderColor: fontColor,
  blogArticleWidth: 740
};

export default BlogPage;
