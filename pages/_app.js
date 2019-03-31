/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import App, { Container } from 'next/app';
import Router from 'next/router';
import withGA from 'next-ga';
import {
  Transition,
  animated,
  interpolate
} from 'react-spring/renderprops.cjs';
import { ThemeProvider } from 'styled-components';
import AppTheme from 'components/AppTheme';
import GlobalStyles from 'components/GlobalStyles';
import WebsiteLayout from 'layouts/WebsiteLayout';

/**
 * Custom Next.js App that wraps all Next.js pages, adds global styles and animates route changes
 *
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
            {/* Animate route changes */}
            <Transition
              native
              unique
              items={items}
              keys={items => items.id}
              initial={{ opacity: 1 }}
              from={{
                opacity: 0,
                translateY: -200,
                scale: 0.9
              }}
              enter={{
                opacity: 1,
                translateY: 0,
                scale: 1
              }}
              leave={{
                opacity: 0,
                translateY: -200,
                scale: 0.9
              }}
            >
              {({ Component, pageProps }) => ({
                opacity,
                translateY,
                scale
              }) => (
                <animated.div
                  style={{
                    opacity,
                    transform: interpolate(
                      [translateY, scale],
                      (translateY, scale) =>
                        `scale(${scale}) translate3d(0, ${translateY}px, 0)`
                    ),
                    width: '100%',
                    overflow: 'hidden',
                    position: 'absolute'
                  }}
                >
                  <Component
                    {...pageProps}
                    routeIsAnimating={opacity.value !== 1}
                  />
                </animated.div>
              )}
            </Transition>
          </WebsiteLayout>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withGA('UA-137363397-1', Router)(WebApp);
