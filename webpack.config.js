const path = require('path')

module.exports = {
  entry: './src/index.js',
  externals: {
    react: 'umd react'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'social-login.js',
    libraryTarget: 'umd'
  },
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
