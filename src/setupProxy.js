import { createProxyMiddleware } from "http-proxy-middleware";

export default (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://api.gitget.co.kr",
      changeOrigin: true,
    })
  );
};
