const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  },
  publicPath: '/aop/',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://aop-web-a3c641-dev.apps.silver.devops.gov.bc.ca',
        changeOrigin: true
      },
    }
  }
})