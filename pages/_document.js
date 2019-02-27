import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

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
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          <link rel="manifest" href="/static/manifest.json" />
          <meta name="theme-color" content="#032566" />
          <meta
            name="Description"
            content="Tim Ellenberger | Javascript, React and GraphQL Consulting and Blog"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat"
            rel="stylesheet"
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
