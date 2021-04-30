module.exports = {
  publicPath: '/aop/',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://aop-web-a3c641-dev.apps.silver.devops.gov.bc.ca',
        changeOrigin: true
      },
    }
  }
}
