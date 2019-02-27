const withCSS = require('@zeit/next-css');
const withOffline = require('next-offline');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  // Alias the /components and /layouts folders for imports
  // e.g. import xyz from 'components/xyz'
  webpack(config) {
    const newConfig = config;
    newConfig.resolve.alias.components = path.join(__dirname, 'components');
    newConfig.resolve.alias.layouts = path.join(__dirname, 'layouts');

    return newConfig;
  },
  // Now 2.0 Build Type
  // https://nextjs.org/blog/next-8#serverless-nextjs
  target: 'serverless',
  // Service Worker implemented via next-offline and powered by Workbox
  // https://github.com/hanford/next-offline#next-offline-options
  // https://developers.google.com/web/tools/workbox/guides/configure-workbox
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      // Always pull images from cache if available
      {
        urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif|webp|ico)/,
        handler: 'cacheFirst',
        options: {
          cacheName: 'image-cache',
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      // Cache all other secure content, but try to fetch from network first
      {
        urlPattern: /^https?.*/,
        handler: 'networkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
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

// Compose next-offline and next-less plugins
const offlinePlugin = withOffline(nextConfig);
const cssPlugin = withCSS(nextConfig);
const cssPluginWithServiceWorker = withCSS(offlinePlugin);

// https://nextjs.org/docs/#production-deployment
// Don't include Service Worker in dev
module.exports = isDev ? cssPlugin : cssPluginWithServiceWorker;
