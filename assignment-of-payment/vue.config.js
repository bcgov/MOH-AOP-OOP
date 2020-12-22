module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://mygovbc-msp-dev.pathfinder.gov.bc.ca',
        ws: true,
        changeOrigin: true
      },
    }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Ministry of Health | Assignment of Payment (AOP)'
    }
  }
}
