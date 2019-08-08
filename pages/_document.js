import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { GOOGLE_ANALYTICS_ID } from '../lib/googleAnalytics';

/**
 * Custom Next.js Document that implements SSR friendly Styled-Components
 * https://nextjs.org/docs/#custom-document
 */
export default class StyledDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          {/* Preconnect to the Google domains */}
          {[
            'https://fonts.gstatic.com',
            'https://fonts.googleapis.com',
            'https://www.googletagmanager.com',
            'https://www.google-analytics.com'
          ].map(href => (
            <link
              key={href}
              rel="preconnect"
              href={href}
              crossOrigin="anonymous"
            />
          ))}
          {/* Google Font: Montserrat */}
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat"
            rel="stylesheet"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
          />
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          <link rel="manifest" href="/static/manifest.json" />
          {/* Google Webmaster Tools Site Verification */}
          <meta
            name="google-site-verification"
            content="CINNC3dOk4o4wlk7uIE7GZm1dxbG-UfQMAkzdpypoog"
          />
          {/* Bing Webmaster Tools Site Verification */}
          <meta
            name="msvalidate.01"
            content="FCA0098C94CF509BD6FC5F3DA79C1549"
          />
          <meta name="theme-color" content="#1d1e1f" />
          {/* Global Site Tag (../lib/googleAnalytics.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
