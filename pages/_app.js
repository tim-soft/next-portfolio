import React from 'react';
import PropTypes from 'prop-types';
import App, { Container } from 'next/app';
import Router from 'next/router';
import { version } from 'next/package.json';
import NextSeo from 'next-seo';
import { Transition, animated } from 'react-spring';
import styled, { ThemeProvider } from 'styled-components';
import appTheme from 'components/AppTheme';
import GlobalStyles from 'components/GlobalStyles';
import WebsiteLayout from 'layouts/WebsiteLayout';
import defaultSEO from 'components/DefaultSEO';
import { pageview } from '../lib/googleAnalytics';

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

  state = {
    dynamicPageThemes: []
  };

  componentDidMount() {
    // eslint-disable-next-line no-console
    console.log(
      '%c ',
      "background: url('https://timellenberger.com/static/avatar.png') 0 0 no-repeat; padding: 66px; border-radius: 50%;"
    );

    // eslint-disable-next-line no-console
    console.log('%cGreetings!', 'font-size: 20px;');

    // eslint-disable-next-line no-console
    console.log(
      `%cThis web app was built with React@${React.version} and Next.js@${version}`,
      'font-size: 17px;'
    );
  }

  updateTheme = dynamicTheme => {
    const { dynamicPageThemes } = this.state;
    const { route } = this.props.router;

    const pageIndex = dynamicPageThemes.findIndex(page => page.route === route);

    if (pageIndex === -1) dynamicPageThemes.push({ route, dynamicTheme });
    else dynamicPageThemes[pageIndex] = { route, dynamicTheme };

    this.setState({ dynamicPageThemes });
  };

  getDynamicPageTheme = () => {
    const { route } = this.props.router;
    const { dynamicPageThemes } = this.state;
    const dynamicPageTheme = dynamicPageThemes.find(
      pageTheme => pageTheme.route === route
    );

    return dynamicPageTheme ? dynamicPageTheme.dynamicTheme : {};
  };

  render() {
    const { Component, pageProps, router } = this.props;
    const { pageTheme } = Component;
    const dynamicTheme = this.getDynamicPageTheme();

    const pages = [
      {
        route: router.route,
        Component,
        pageProps
      }
    ];

    // _app level theme variables, wrapping the entire layout
    const theme = {
      // Theme variables defined in /src/components
      ...appTheme,
      // Add any theme variables provided by the page/route level component
      ...pageTheme,
      ...dynamicTheme
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
              items={pages}
              keys={page => page.route}
              initial={{ opacity: 1, transform: 'scale(1) translateY(0px)' }}
              from={{ opacity: 0, transform: 'scale(0.9) translateY(-200px)' }}
              enter={{ opacity: 1, transform: 'scale(1) translateY(0px)' }}
              leave={{ opacity: 0, transform: 'scale(0.9) translateY(-200px)' }}
            >
              {page => animStyles => (
                <AnimatedContainer key={page.route} style={animStyles}>
                  <page.Component
                    {...page.pageProps}
                    route={page.route}
                    theme={{ ...page.pageTheme, ...dynamicTheme }}
                    updateTheme={this.updateTheme}
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

// Apply Google Analytics to app
// https://github.com/zeit/next.js/tree/canary/examples/with-google-analytics
Router.events.on('routeChangeComplete', url => pageview(url));

export default WebApp;

const AnimatedContainer = animated(styled.div`
  will-change: opacity, transform;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: absolute;
`);
