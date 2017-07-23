const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      hash: false,
      filename: 'index.html',
      inject: true,
      minify: {
        collapseWhitespace: true
      }
    })
  ],
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['es2015', 'react', 'stage-2']
      }
    }]
  }
}
