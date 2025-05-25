export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5, // 设计稿宽度的1/10
      propList: ['*'], // 需要转换的属性，这里表示全部都进行转换
      selectorBlackList: ['.norem'], // 过滤掉.norem-开头的class，不进行rem转换
      exclude: /node_modules/i,
      replace: true,
      mediaQuery: false,
      minPixelValue: 1, // 小于或等于1px不转换为rem
      unitPrecision: 5 // rem保留几位小数点
    }
  }
}
 