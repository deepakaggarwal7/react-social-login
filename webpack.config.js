const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [
    'whatwg-fetch',
    './src/index.js'
  ],
  externals: [{
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  }],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'social-login.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [
          'react',
          ['env', {
            targets: {
              browsers: ['>= 5%'],
              node: 6,
              forceAllTransforms: process.env.NODE_ENV === 'development' // Fixes UglifyJS errors with ES6 syntax
            }
          }]
        ],
        plugins: [
          'transform-inline-environment-variables',
          'transform-object-rest-spread',
          'transform-class-properties'
        ]
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
}
