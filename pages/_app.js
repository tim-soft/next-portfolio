/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import App, { Container } from 'next/app';
import { Transition, animated } from 'react-spring/renderprops.cjs';
import { ThemeProvider } from 'styled-components';
import AppTheme from '../components/AppTheme';
import GlobalStyles from '../components/GlobalStyles';
import WebsiteLayout from '../layouts/WebsiteLayout';

/**
 * Custom Next.js App that wraps all Next.js pages, adds global styles and animates route changes
 * https://nextjs.org/docs/#custom-app
 */
class WebApp extends App {
  static propTypes = {
    /* The current Page component */
    Component: PropTypes.func.isRequired,

    /* Props of the Next.js page */
    pageProps: PropTypes.object.isRequired
  };

  render() {
    const { Component, pageProps } = this.props;

    const items = [
      {
        id: this.props.router.route,
        Component,
        pageProps
      }
    ];

    // _app level theme variables, wrapping the entire layout
    const theme = {
      // Theme variables defined in /src/components
      ...AppTheme,
      // Add any theme variables provided by the page/route level component
      ...Component.theme
    };

    return (
      <Container>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <WebsiteLayout>
            <Transition
              native
              unique
              items={items}
              keys={items => items.id}
              initial={{ opacity: 1 }}
              from={{
                opacity: 0,
                transform: 'scale(0.9) translate3d(0,-200px,0)'
              }}
              enter={{ opacity: 1, transform: 'scale(1) translate3d(0,0px,0)' }}
              leave={{
                opacity: 0,
                transform: 'scale(0.9) translate3d(0,-200px,0)'
              }}
            >
              {({ Component, pageProps }) => styles => (
                <animated.div
                  style={{
                    ...styles,
                    width: '100%',
                    overflow: 'hidden',
                    position: 'absolute'
                  }}
                >
                  <Component {...pageProps} />
                </animated.div>
              )}
            </Transition>
          </WebsiteLayout>
        </ThemeProvider>
      </Container>
    );
  }
}

export default WebApp;
