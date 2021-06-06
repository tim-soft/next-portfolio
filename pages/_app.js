/* eslint-disable react/prop-types */
import * as React from 'react';
import Router from 'next/router';
import { DefaultSeo } from 'next-seo';
import { animated, useTransition } from '@react-spring/web';
import styled, { ThemeProvider } from 'styled-components';
import appTheme from 'components/AppTheme';
import GlobalStyles from 'components/GlobalStyles';
import WebsiteLayout from 'layouts/WebsiteLayout';
import defaultSeoConfig from 'components/DefaultSEO';
import useDevConsoleBanner from 'hooks/useDevConsoleBanner';
import { pageview } from '../lib/googleAnalytics';

/**
 * Custom Next.js App that wraps all Next.js pages, adds global styles and animates route changes
 *
 * @see https://nextjs.org/docs/#custom-app
 */
const WebApp = ({ Component, pageProps, router }) => {
    const [dynamicPageThemes, setDynamicPageThemes] = React.useState([]);
    useDevConsoleBanner();

    const updateTheme = (dynamicTheme) => {
        const { route } = router;

        const pageIndex = dynamicPageThemes.findIndex(
            (page) => page.route === route
        );

        if (pageIndex === -1) {
            setDynamicPageThemes([
                ...dynamicPageThemes,
                { route, dynamicTheme },
            ]);
        } else {
            const nextDynamicPageThemes = [...dynamicPageThemes];
            nextDynamicPageThemes[pageIndex] = { route, dynamicTheme };

            setDynamicPageThemes(nextDynamicPageThemes);
        }
    };

    const getDynamicPageTheme = (route) => {
        const dynamicPageTheme = dynamicPageThemes.find(
            (pageTheme) => pageTheme.route === route
        );

        return dynamicPageTheme ? dynamicPageTheme.dynamicTheme : {};
    };

    const dynamicTheme = getDynamicPageTheme(router.route);

    // _app level theme variables, wrapping the entire layout
    const theme = {
        // Theme variables defined in /src/components
        ...appTheme,
        // Add any theme variables provided by the page/route level component
        ...Component.pageTheme,
        ...dynamicTheme,
    };

    // Maintain single element array for route transition
    const pages = [
        {
            route: router.route,
            Component,
            pageProps,
            pageTheme: Component.pageTheme,
        },
    ];

    const pageTransition = useTransition(pages, {
        keys: (page) => page.route,
        initial: {
            opacity: 1,
            transform: 'scale(1) translateY(0px)',
        },
        from: {
            opacity: 0,
            transform: 'scale(0.9) translateY(-200px)',
        },
        enter: {
            opacity: 1,
            transform: 'scale(1) translateY(0px)',
        },
        leave: {
            opacity: 0,
            transform: 'scale(0.9) translateY(-200px)',
        },
    });

    return (
        <>
            <DefaultSeo {...defaultSeoConfig} />
            <GlobalStyles />
            <ThemeProvider theme={theme}>
                <WebsiteLayout {...Component.layoutProps}>
                    {pageTransition((animStyles, page) => (
                        <AnimatedContainer key={page.route} style={animStyles}>
                            <page.Component
                                {...page.pageProps}
                                // Pass route from transition data
                                route={page.route}
                                // Combine page theme from transition with current dynamic page theme
                                // for this route
                                theme={{
                                    ...page.pageTheme,
                                    // eslint-disable-next-line react/no-this-in-sfc
                                    ...getDynamicPageTheme(page.route),
                                }}
                                // eslint-disable-next-line react/no-this-in-sfc
                                updateTheme={updateTheme}
                            />
                        </AnimatedContainer>
                    ))}
                </WebsiteLayout>
            </ThemeProvider>
        </>
    );
};

// Apply Google Analytics to app
// https://github.com/zeit/next.js/tree/canary/examples/with-google-analytics
Router.events.on('routeChangeComplete', (url) => pageview(url));

export default WebApp;

const AnimatedContainer = animated(styled.div`
    will-change: opacity, transform;
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: absolute;
`);
