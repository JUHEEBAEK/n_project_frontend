module.exports = {
  lintOnSave: false,
  transpileDependencies: ["vuetify"],
  devServer: {
    disableHostCheck: true,
    port: 8080,
    public: "0.0.0.0:8080"
  }
};
