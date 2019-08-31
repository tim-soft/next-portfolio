import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import LibraryLayout from 'layouts/LibraryLayout';
import { darkTheme } from 'components/AppTheme';
import { BlogImageGallery } from 'components/Blog';

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
      <p>
        A flexible image gallery lightbox with native-feeling touch gestures and
        buttery smooth animations, built with react-spring.
      </p>
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
