import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
// import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

export default defineConfig({
  base: "/aop/",
  plugins: [
    nodePolyfills(), //used for pdf-js streams
    vue({
      // This is needed so Vite can find web image paths
      // For example, <img src="/images/logo.png"> will not work without the code below
      template: {
        transformAssetUrls: {
          includeAbsolute: false,
        },
      },
    }),
    // NodeGlobalsPolyfillPlugin({
    //   process: true,
    //   buffer: true,
    // }),
    // NodeModulesPolyfillPlugin(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      util: "rollup-plugin-node-polyfills/polyfills/util",
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  server: {
    proxy: {
      "/aop/api": {
        target: "https://aop-web-a3c641-dev.apps.silver.devops.gov.bc.ca/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
