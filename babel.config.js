// module.exports = {
//   presets: ["@vue/cli-plugin-babel/preset", "@babel/preset-env"]
// };

module.exports = {
  // ie에 vuetify 및 최신 문법 적용하기 위해서 밑에껄로 바꿈.
  // presets: ["@babel/preset-env"],
  // ie 적용 전 기존 세팅
  presets: ["@vue/cli-plugin-babel/preset"],
  // jest 에서 require.context() 를 인지하기 위한 셋팅
  env: {
    test: {
      plugins: ["require-context-hook"]
    }
  }
};
