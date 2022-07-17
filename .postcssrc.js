module.exports = {
  plugins: {
    // 配置使用autoprefixer插件
    // 作用生成浏览器CSS样式规则的前缀
    // vuecli已经配置过,所以不用重复配置中
    /*   'autoprefixer': {
        browsers: ['Android >= 4.0', 'iOS >= 8']
      }, */
    'postcss-pxtorem': {
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'],
      // 排除不要转换的样式资源
      exclude: 'github-markdown'
    }
  }
}
