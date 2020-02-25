const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/kth/schema',
    proxy.createProxyMiddleware({
        target: 'https://www.kth.se/api/schema/v2',
        changeOrigin: true,
        pathRewrite: {
          '^/kth/schema': '/', // rewrite path
        }
    })
  );
  app.use(
    '/kth/kopps',
    proxy.createProxyMiddleware({
        target: 'https://api.kth.se/api/kopps/v2',
        changeOrigin: true,
        pathRewrite: {
          '^/kth/kopps': '/', // rewrite path
        }
    })
  );
};