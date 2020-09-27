module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
      @import "~@/styles/variables.scss";
      @import "~@/styles/mixins.scss";
      @import "~@/styles/typography.scss";
      @import "~@/styles/main.scss";
      `
      }
    }
  }
}
