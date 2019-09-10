import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import LibraryLayout from 'layouts/LibraryLayout';
import { darkTheme } from 'components/AppTheme';
import { BlogCodeBlock, BlogCodeInline, BlogLink } from 'components/Blog';
import {
  LightboxDemoNoUI,
  LightboxDemoAllControls
} from 'components/Libraries/react-spring-lightbox/demos';

const LibraryPage = ({ route, theme }) => (
  <ThemeProvider theme={theme}>
    <LibraryLayout route={route}>
      <section>
        <p>
          <BlogCodeInline>react-spring-particles</BlogCodeInline> is a modal
          photo gallery that aims to replicate <strong>all</strong> of the input
          UX of hardware-accelerated native image applications from touch
          swiping to <BlogCodeInline>Ctrl + Mousewheel</BlogCodeInline> zooming.
        </p>
      </section>
      <section>
        <h2>Supported Gestures and Features</h2>

        <ul>
          <li>
            <span role="img" aria-label="keyboard">
              ☝️
            </span>
            <BlogCodeInline>Mousewheel</BlogCodeInline>, swipe or click+drag to
            page photos
          </li>
          <li>
            <span role="img" aria-label="keyboard">
              ⌨️
            </span>
            Keyboard controls <BlogCodeInline>←</BlogCodeInline>{' '}
            <BlogCodeInline>→</BlogCodeInline>{' '}
            <BlogCodeInline>Esc</BlogCodeInline>
          </li>
          <li>
            <span role="img" aria-label="keyboard">
              🐁
            </span>
            <BlogCodeInline>Ctrl</BlogCodeInline> +{' '}
            <BlogCodeInline>Mousewheel</BlogCodeInline> or{' '}
            <BlogCodeInline>Trackpad Pinch</BlogCodeInline> to zoom
          </li>
          <li>
            <span role="img" aria-label="keyboard">
              🔎
            </span>
            Double-tap or double-click to zoom in/out
          </li>
          <li>
            <span role="img" aria-label="keyboard">
              👌
            </span>
            Pinch to zoom
          </li>
          <li>
            <span role="img" aria-label="keyboard">
              👈
            </span>
            Panning on zoomed-in images
          </li>
          <li>
            <span role="img" aria-label="keyboard">
              🏁
            </span>
            Highly performant spring based animations via{' '}
            <BlogLink
              href="https://github.com/react-spring/react-spring"
              paragraph
            >
              react-spring
            </BlogLink>
          </li>
          <li>No external CSS</li>
          <li>Implement your own UI</li>
        </ul>
      </section>
      <section>
        <h2>Demos</h2>
        <p>
          Out of the box, this library purposely does not include any UI
          elements (header, footer, buttons etc). With the available{' '}
          <BlogCodeInline>{`renderHeader={}`}</BlogCodeInline>,{' '}
          <BlogCodeInline>{`renderFooter={}`}</BlogCodeInline>,{' '}
          <BlogCodeInline>{`renderPrevButton={}`}</BlogCodeInline> and{' '}
          <BlogCodeInline>{`renderNextButton={}`}</BlogCodeInline> props, the
          sky is the limit for total customization.
        </p>
        <p>
          All that is included is the image stage which implements all gestures
          (press <BlogCodeInline>Esc</BlogCodeInline> to close).
        </p>
        <LightboxDemoNoUI />
        <p>
          Utilizing the UI props to add a custom fixed header, absolutely
          positioned footer and left/right arrow buttons
        </p>
        <LightboxDemoAllControls />
      </section>
      <section>
        <h2>Installation</h2>
        <p>This library is built with hooks and requires React {`>=`} 16.8.0</p>
        <BlogCodeBlock
          path="Terminal"
          language="bash"
          code="yarn add react-spring-lightbox"
        />
      </section>
      <section>
        <h2>Basic Usage</h2>
        <BlogCodeBlock
          width={860}
          path="/components/Lightbox.js"
          language="jsx"
          code={`
import React, { useState } from 'react';
import Lightbox from 'react-spring-lightbox';

const images = [
  {
    src:
      'https://timellenberger.com/static/blog-content/dark-mode/win10-dark-mode.jpg',
    alt: 'Windows 10 Dark Mode Setting'
  },
  {
    src:
      'https://timellenberger.com/static/blog-content/dark-mode/macos-dark-mode.png',
    alt: 'macOS Mojave Dark Mode Setting'
  },
  {
    src:
      'https://timellenberger.com/static/blog-content/dark-mode/android-9-dark-mode.jpg',
    alt: 'Android 9.0 Dark Mode Setting'
  }
];

const CoolLightbox = () => {
  const [currentImageIndex, setCurrentIndex] = useState(0);

  const gotoPrevious = () =>
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = () =>
    currentImageIndex + 1 < images.length &&
    setCurrentIndex(currentImageIndex + 1);

  return (
    <Lightbox
      isOpen={true}
      onPrev={gotoPrevious}
      onNext={gotoNext}
      images={images}
      currentIndex={currentImageIndex}
      /* Add your own UI */
      // renderHeader={() => (<CustomHeader />)}
      // renderFooter={() => (<CustomFooter />)}
      // renderPrevButton={() => (<CustomLeftArrowButton />)}
      // renderNextButton={() => (<CustomRightArrowButton />)}

      /* Add styling */
      // className="cool-class"
      // style={{ background: "grey" }}

      /* Handle closing */
      // onClose={handleClose}

      /* react-spring config for open/close animation */
      // pageTransitionConfig={{
      //   from: { transform: "scale(0.75)", opacity: 0 },
      //   enter: { transform: "scale(1)", opacity: 1 },
      //   leave: { transform: "scale(0.75)", opacity: 0 },
      //   config: { mass: 1, tension: 320, friction: 32 }
      // }}
    />
  );
};

export default CoolLightbox;
      `}
        />
      </section>
    </LibraryLayout>
  </ThemeProvider>
);

LibraryPage.propTypes = {
  route: PropTypes.string.isRequired,
  theme: PropTypes.object
};

LibraryPage.defaultProps = {
  theme: {}
};

LibraryPage.pageTheme = darkTheme;

export default LibraryPage;
