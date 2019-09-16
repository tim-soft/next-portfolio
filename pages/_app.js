import React from 'react';
import PropTypes from 'prop-types';
import App from 'next/app';
import Router from 'next/router';
import { version } from 'next/package.json';
import { DefaultSeo } from 'next-seo';
import { Transition, animated } from '@react-spring/web';
import styled, { ThemeProvider } from 'styled-components';
import appTheme from 'components/AppTheme';
import GlobalStyles from 'components/GlobalStyles';
import WebsiteLayout from 'layouts/WebsiteLayout';
import defaultSeoConfig from 'components/DefaultSEO';
import { pageview } from '../lib/googleAnalytics';

/**
 * Custom Next.js App that wraps all Next.js pages, adds global styles and animates route changes
 *
 * @see https://nextjs.org/docs/#custom-app
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
    const APP_URL = process.env.APP_BASE_URL;

    // eslint-disable-next-line no-console
    console.log(
      '%c ',
      `background: url('${APP_URL}/static/avatar.png') 0 0 no-repeat; padding: 66px; border-radius: 50%;`
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

  getDynamicPageTheme = route => {
    const { dynamicPageThemes } = this.state;
    const dynamicPageTheme = dynamicPageThemes.find(
      pageTheme => pageTheme.route === route
    );

    return dynamicPageTheme ? dynamicPageTheme.dynamicTheme : {};
  };

  render() {
    const { Component, pageProps, router } = this.props;
    const { pageTheme } = Component;
    const dynamicTheme = this.getDynamicPageTheme(router.route);

    // _app level theme variables, wrapping the entire layout
    const theme = {
      // Theme variables defined in /src/components
      ...appTheme,
      // Add any theme variables provided by the page/route level component
      ...pageTheme,
      ...dynamicTheme
    };

    // Maintain single element array for route transition
    const pages = [
      {
        route: router.route,
        Component,
        pageProps,
        pageTheme
      }
    ];

    return (
      <>
        <DefaultSeo {...defaultSeoConfig} />
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
                    // Pass route from transition data
                    route={page.route}
                    // Combine page theme from transition with current dynamic page theme
                    // for this route
                    theme={{
                      ...page.pageTheme,
                      ...this.getDynamicPageTheme(page.route)
                    }}
                    updateTheme={this.updateTheme}
                  />
                </AnimatedContainer>
              )}
            </Transition>
          </WebsiteLayout>
        </ThemeProvider>
      </>
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
