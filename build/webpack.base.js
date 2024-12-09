const path = require('path')
const webpack = require('webpack')
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
      //匹配 ts和tsx 文件
      {
        test: /.(ts|tsx)$/, 
        use: 'babel-loader',
      },
      //匹配 css和scss 文件
      {
        test: /.(css|scss)$/, 
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      // 匹配图片文件
      {
        test: /.(png|jpg|jpeg|gif|svg)$/, 
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: 'static/images/[name][ext]', // 文件输出目录和命名
        },
      },
      // 匹配字体图标文件
      {
        test: /.(woff2?|eot|ttf|otf)$/, 
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: 'static/fonts/[name][ext]', // 文件输出目录和命名
        },
      },
      // 匹配媒体文件
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, 
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: 'static/media/[name][ext]', // 文件输出目录和命名
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
    // 注入环境变量
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
    }),
  ],
}
