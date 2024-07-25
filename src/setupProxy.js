import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://api.abortionpolicyapi.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
      onProxyReq: (proxyReq) => {
        proxyReq.setHeader("origin", "https://api.abortionpolicyapi.com");
      },
    })
  );
}
