module.exports = {
  publicPath: '/oop/',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://oop-web-a3c641-test.apps.silver.devops.gov.bc.ca',
        changeOrigin: true,
      },
    }
  },
  lintOnSave: true
};
