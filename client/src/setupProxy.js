const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
   app.use(createProxyMiddleware("/journeys", { target: "https://api.navitia.io/v1","secure": false,
"changeOrigin": true }));
   app.use(createProxyMiddleware("/places", { target: "https://api.navitia.io/v1","secure": false,
"changeOrigin": true }));
};


