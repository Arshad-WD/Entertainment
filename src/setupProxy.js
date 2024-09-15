// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/games',
    createProxyMiddleware({
      target: 'https://api.igdb.com/v4',
      changeOrigin: true,
      headers: {
        'Client-ID': 'cnm977r5eoi0ilrpvcdkg6gvbxqilo',
        'Authorization': 'Bearer 8yfq7y65m5ig88vcljg13ov30opfkb'
      },
      pathRewrite: {
        '^/games': '/games'
      }
    })
  );
};
