import { createProxyMiddleware } from "http-proxy-middleware";

export default (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://43.202.231.124:8080",
      changeOrigin: true,
    })
  );
};
