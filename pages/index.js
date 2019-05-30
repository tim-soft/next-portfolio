import React from 'react';
import PropTypes from 'prop-types';
import NextSEO from 'next-seo';
import IntroBanner from 'layouts/WebsiteLayout/components/IntroBanner';

const HomePage = ({ routeIsAnimating }) => (
  <>
    <NextSEO
      config={{
        title: 'Home | Tim Ellenberger',
        openGraph: {
          title: 'Home | Tim Ellenberger'
        }
      }}
    />
    <IntroBanner routeIsAnimating={routeIsAnimating} />
  </>
);

HomePage.propTypes = {
  routeIsAnimating: PropTypes.bool.isRequired
};

HomePage.layoutProps = {
  showBio: true
};

const fontColor = '#29c4e5';
const navFontColor = 'gainsboro';
const highlightFontColor = 'springgreen';
const backgroundColor = '#3b3f45';

// _app.js level theme variable overrides
HomePage.theme = {
  headerNavFontColor: navFontColor,
  headerNavTextUnderlineColor: highlightFontColor,
  headerNavHoverFontColor: highlightFontColor,
  headerNavHamburgerIconColor: navFontColor,
  pageBackgroundColor: backgroundColor,
  pageContentFontColor: fontColor,
  pageContentLinkHoverColor: highlightFontColor
};

export default HomePage;
