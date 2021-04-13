const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log(process.env.REACT_APP_BASE_URL);
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.REACT_APP_BASE_URL,
      changeOrigin: true,
    })
  );
};
