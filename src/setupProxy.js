const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    proxy({
      target: 'https://74b1zqp24m.execute-api.eu-central-1.amazonaws.com/Prod',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove /api from the request path
      },
    })
  );
};
