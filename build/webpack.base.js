const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口文件
  entry: path.join(__dirname, '../src/index.tsx'),
  // 打包文件出口
  output: {
    filename: 'static/js/[name].js', // 每个输出js的名称
    path: path.join(__dirname, '../dist'), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: '/', // 打包后文件的公共前缀路径
  },
  // 这些选项决定了如何处理项目中的不同类型的模块
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: {
          loader: 'babel-loader',
          options: {
            // 预设执行顺序由右往左,所以先处理ts,再处理jsx
            presets: ['@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
    ],
  },
  // 在引入模块时不带文件后缀时，会来该配置数组里面依次添加后缀查找文件
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
  },
  //插件在 Webpack 构建过程中提供了更多的功能，如优化、压缩、分割代码等。
  //插件可以在整个构建过程中的特定时机注入上下文。
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),
  ],
}
