// module.exports = {
//   lintOnSave: false,
//   transpileDependencies: ["vuetify"],
//   devServer: {
//     disableHostCheck: true
//   }
// };

const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // vue.config.js 설정 https://cli.vuejs.org/config/
  transpileDependencies: ["vuetify"],
  lintOnSave: false,
  productionSourceMap: false, // source-map 비활성화
  configureWebpack: {
    optimization: {
      minimizer: [
        new TerserPlugin({
          // https://webpack.js.org/plugins/terser-webpack-plugin/#terseroptions
          terserOptions: {
            compress: {
              // dead_code: true, // env.NODE_DEV === 'developmen' 로 분기처리된 블럭 제거 > 추후 필요시 사용
              drop_console: true
            },
            output: {
              comments: false
            }
          },
          extractComments: false
        })
      ]
    },
    plugins: [new CleanWebpackPlugin()]
  },
  chainWebpack: config => {
    config.module
      .rule("raw-loader")
      .test(/\.md$/i)
      .use("raw-loader")
      .loader("raw-loader")
      .end();

    config.module
      .rule("worker")
      .test(/\.worker\.js$/i)
      .use("comlink-loader")
      .loader("comlink-loader")
      .end();

    config.plugins.delete("prefetch");
  }
};
