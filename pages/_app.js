/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import App, { Container } from 'next/app';
import { version } from 'next/package.json';
import Router from 'next/router';
import withGA from 'next-ga';
import NextSeo from 'next-seo';
import {
  Transition,
  animated,
  interpolate
} from 'react-spring/renderprops.cjs';
import styled, { ThemeProvider } from 'styled-components';
import AppTheme from 'components/AppTheme';
import GlobalStyles from 'components/GlobalStyles';
import WebsiteLayout from 'layouts/WebsiteLayout';
import defaultSEO from 'components/DefaultSEO';

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

  componentDidMount() {
    // eslint-disable-next-line no-console
    console.log(
      '%c ',
      "background: url('https://timellenberger.now.sh/static/avatar.png') 0 0 no-repeat; padding: 66px; border-radius: 50%;"
    );

    // eslint-disable-next-line no-console
    console.log(
      '%cGreetings!',
      'color: green; font-size: 35px; font-family: monospace;'
    );

    // eslint-disable-next-line no-console
    console.log(
      `%cThis website was built with React@${React.version} and Next.js@${version}`,
      'color: black; font-size: 18px;'
    );
  }

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
        <NextSeo config={defaultSEO} />
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <WebsiteLayout {...Component.layoutProps}>
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
                <AnimatedContainer
                  style={{
                    opacity,
                    transform: interpolate(
                      [translateY, scale],
                      (translateY, scale) =>
                        `scale(${scale}) translateY(${translateY}px)`
                    )
                  }}
                >
                  <Component
                    {...pageProps}
                    routeIsAnimating={opacity.value !== 1}
                  />
                </AnimatedContainer>
              )}
            </Transition>
          </WebsiteLayout>
        </ThemeProvider>
      </Container>
    );
  }
}

// Apply Google Analytics to entire app
// https://github.com/sergiodxa/next-ga
export default withGA('UA-137363397-1', Router)(WebApp);

const AnimatedContainer = animated(styled.div`
  will-change: opacity, transform;
  width: 100%;
  overflow: hidden;
  position: absolute;
`);
