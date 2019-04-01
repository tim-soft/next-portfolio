import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import NextSEO from 'next-seo';
import IntroBanner from 'layouts/WebsiteLayout/components/IntroBanner';

const HomePage = ({ routeIsAnimating }) => (
  <>
    <Head>
      <meta name="theme-color" content="#1D1E1F" />
    </Head>
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

export default HomePage;
