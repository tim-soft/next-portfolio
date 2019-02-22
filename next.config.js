const withLess = require('@zeit/next-less');
const withOffline = require('next-offline');

const isDev = process.env.NODE_ENV === 'development';

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
}

const nextConfig = {
  // Less loader for ant-design
  // http://lesscss.org/usage/#less-options
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  // Now 2.0 Build Type
  // https://nextjs.org/blog/next-8#serverless-nextjs
  target: 'serverless',
  // Service Worker
  // https://github.com/hanford/next-offline#next-offline-options
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
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
const lessPlugin = withLess(nextConfig);
const lessPluginWithServiceWorker = withLess(offlinePlugin);

// https://nextjs.org/docs/#production-deployment
// Don't include Service Worker in dev
module.exports = isDev ? lessPlugin : lessPluginWithServiceWorker;
