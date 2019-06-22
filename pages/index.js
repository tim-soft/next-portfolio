import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import NextSEO from 'next-seo';
import IntroBanner from 'layouts/WebsiteLayout/components/IntroBanner';
import { generatePageTheme } from 'components/AppTheme';

const HomePage = ({ routeIsAnimating, theme }) => (
  <>
    <NextSEO
      config={{
        title: 'Home | Tim Ellenberger',
        openGraph: {
          title: 'Home | Tim Ellenberger'
        }
      }}
    />
    <ThemeProvider theme={theme}>
      <IntroBanner routeIsAnimating={routeIsAnimating} />
    </ThemeProvider>
  </>
);

HomePage.propTypes = {
  routeIsAnimating: PropTypes.bool.isRequired,
  theme: PropTypes.object
};

HomePage.defaultProps = {
  theme: {}
};

HomePage.layoutProps = {
  showBio: true
};

// Generate page theme
HomePage.getInitialProps = async () => {
  const theme = generatePageTheme({
    fontColor: '#31d7f9',
    highlightFontColor: 'springgreen',
    backgroundColor: '#3b3f45',
    override: {
      headerNavFontColor: 'gainsboro',
      headerNavMobileMenuFontColor: 'gainsboro',
      headerNavHamburgerIconColor: 'gainsboro',
      popoutMenuBorderColor: 'black',
      pageContentLinkHoverColor: 'springgreen'
    }
  });

  return { theme };
};

export default HomePage;
