import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import IntroBanner from 'layouts/WebsiteLayout/components/IntroBanner';

const HomePage = ({ routeIsAnimating }) => (
  <>
    <Head>
      <title>Home | Tim Ellenberger</title>
    </Head>

    <IntroBanner routeIsAnimating={routeIsAnimating} />
  </>
);

HomePage.propTypes = {
  routeIsAnimating: PropTypes.bool.isRequired
};

export default HomePage;
