const withOffline = require('next-offline');
const path = require('path');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';

/**
 * Configure Next.js
 *
 * https://nextjs.org/docs/#custom-configuration
 */
const nextConfig = {
  // Build-time variables available via `process.env` within the app
  env: {
    APP_BASE_URL: isDev
      ? `http://localhost:${process.env.PORT || 3000}`
      : 'https://timellenberger.com'
  },
  // Alias the /components and /layouts folders for imports
  // e.g. import xyz from 'components/xyz'
  webpack(config) {
    const newConfig = config;
    newConfig.resolve.alias.components = path.join(__dirname, 'components');
    newConfig.resolve.alias.layouts = path.join(__dirname, 'layouts');
    newConfig.resolve.alias.data = path.join(__dirname, 'data');
    // Allow proper tree shaking for react-icons lib
    // https://github.com/react-icons/react-icons/issues/154#issuecomment-412774515
    newConfig.resolve.extensions = ['.mjs', '.js', '.jsx', '.json'];
    // Optimize react-highlight bundle
    // https://react-highlight.neostack.com/docs/optimisation
    newConfig.plugins.push(
      new webpack.ContextReplacementPlugin(
        /highlight\.js[/\\]lib[/\\]languages$/,
        new RegExp(`^./(javascript)$`)
      )
    );

    return newConfig;
  },

  // Now 2.0 Build Type
  // https://nextjs.org/blog/next-8#serverless-nextjs
  target: 'serverless',
  // Add manifest to WorkBox cache
  transformManifest: manifest => ['/'].concat(manifest),
  // Service Worker implemented via next-offline and powered by Workbox
  // https://github.com/hanford/next-offline#next-offline-options
  // https://developers.google.com/web/tools/workbox/guides/configure-workbox
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      // Always pull images from cache if available
      {
        urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif|webp|ico)/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'image-cache',
          cacheableResponse: {
            statuses: [0, 200]
          },
          expiration: {
            maxEntries: 200
          }
        }
      },
      /**
       * Cache Google Fonts
       *
       * https://developers.google.com/web/tools/workbox/
       */
      // Cache the Google Fonts stylesheets with a stale while revalidate strategy.
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-stylesheets',
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      // Cache the Google Fonts webfont files with a cache first strategy for 1 year.
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-webfonts',
          cacheableResponse: {
            statuses: [0, 200]
          },
          expiration: {
            maxAgeSeconds: 60 * 60 * 24 * 365
          }
        }
      },
      // Cache all other secure content, but try to fetch from network first
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
};

// Compose next-offline plugin with next config
const offlinePlugin = withOffline(nextConfig);

// https://nextjs.org/docs/#production-deployment
// Don't include Service Worker in dev
module.exports = isDev ? nextConfig : offlinePlugin;
