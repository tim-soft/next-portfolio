import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import NextSEO, { BreadcrumbJsonLd } from 'next-seo';
import IntroBanner from 'layouts/WebsiteLayout/components/IntroBanner';
import { generatePageTheme } from 'components/AppTheme';

const { APP_BASE_URL } = process.env;

const HomePage = ({ theme }) => (
  <>
    {/* https://schema.org/breadcrumb */}
    <BreadcrumbJsonLd
      itemListElements={[
        {
          position: 1,
          name: APP_BASE_URL,
          item: APP_BASE_URL
        },
        {
          position: 2,
          name: 'Home',
          item: APP_BASE_URL
        }
      ]}
    />
    <NextSEO
      config={{
        title: 'Home | Tim Ellenberger',
        openGraph: {
          title: 'Home | Tim Ellenberger'
        }
      }}
    />
    <ThemeProvider theme={theme}>
      <IntroBanner />
    </ThemeProvider>
  </>
);

HomePage.propTypes = {
  theme: PropTypes.object
};

HomePage.defaultProps = {
  theme: {}
};

HomePage.layoutProps = {
  showBio: true
};

// Override default app theme for this page
HomePage.pageTheme = generatePageTheme({
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

export default HomePage;
