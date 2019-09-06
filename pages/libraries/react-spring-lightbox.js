import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import LibraryLayout from 'layouts/LibraryLayout';
import { darkTheme } from 'components/AppTheme';
import { BlogCodeBlock, BlogImageGallery } from 'components/Blog';

const images = [
  {
    src: 'https://i.imgur.com/8oNzu0S.png',
    alt: 'README.md',
    caption: 'README.md',
    width: 2486,
    height: 1469
  },
  {
    src:
      'https://timellenberger.com/static/blog-content/dark-mode/win10-dark-mode.jpg',
    alt: 'Windows 10 Dark Mode Setting',
    caption: 'Windows 10 Dark Mode Setting',
    width: 2848,
    height: 2035
  },
  {
    src:
      'https://timellenberger.com/static/blog-content/dark-mode/macos-dark-mode.png',
    alt: 'macOS Mojave Dark Mode Setting',
    caption: 'macOS Mojave Dark Mode Setting',
    width: 1200,
    height: 1218
  },
  {
    src:
      'https://timellenberger.com/static/blog-content/dark-mode/android-9-dark-mode.jpg',
    alt: 'Android 9.0 Dark Mode Setting',
    caption: 'Android 9.0 Dark Mode Setting',
    width: 1280,
    height: 600
  }
];

const LibraryPage = ({ route, theme }) => (
  <ThemeProvider theme={theme}>
    <LibraryLayout route={route}>
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
      <section>
        <h2>Test 1</h2>
        <BlogImageGallery galleryTitle="Test 1" images={images} />
      </section>
      <section>
        <h2>Test 2</h2>
        <BlogImageGallery galleryTitle="Test 1" images={images} />
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
