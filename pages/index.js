import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import NextSEO, { BreadcrumbJsonLd } from 'next-seo';
import IntroBanner from 'layouts/WebsiteLayout/components/IntroBanner';
import { generatePageTheme } from 'components/AppTheme';

const APP_URL = process.env.APP_BASE_URL;

const HomePage = ({ theme, route }) => (
  <>
    {/* https://schema.org/breadcrumb */}
    <BreadcrumbJsonLd
      itemListElements={[
        {
          position: 1,
          name: APP_URL,
          item: APP_URL
        },
        {
          position: 2,
          name: 'Home',
          item: APP_URL
        }
      ]}
    />
    <NextSEO
      config={{
        title: 'Home | Tim Ellenberger',
        canonical: `${APP_URL}${route}`,
        openGraph: {
          url: `${APP_URL}${route}`,
          title: 'Home | Tim Ellenberger',
          images: [
            {
              url: `${APP_URL}/static/avatar.png`,
              alt: 'Avatar Logo'
            }
          ],
          type: 'website'
        },
        site_name: 'Coding, Musings and Adventures of Tim Ellenberger',
        locale: 'en_US',
        profile: {
          firstName: 'Tim',
          lastName: 'Ellenberger',
          username: 'tim-soft',
          gender: 'male'
        }
      }}
    />
    <ThemeProvider theme={theme}>
      <IntroBanner />
    </ThemeProvider>
  </>
);

HomePage.propTypes = {
  theme: PropTypes.object,
  route: PropTypes.string.isRequired
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
