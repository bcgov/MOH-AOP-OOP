const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
  publicPath: '/aop/',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://aop-web-a3c641-dev.apps.silver.devops.gov.bc.ca',
        changeOrigin: true
      },
    }
  },
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin()
    ]
  }
}
