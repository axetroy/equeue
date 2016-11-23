const path = require('path');
const webpack = require('webpack');
require('unminified-webpack-plugin');
const argv = require('yargs');

// webpack.config.js
module.exports = {
  entry: {
    "equeue": path.join(__dirname, 'index.ts'),
    "equeue.min": path.join(__dirname, 'index.ts')
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
    library: 'equeue',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.coffee', '.js', '.ts']
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: []
        }
      },
      {test: /\.tsx?$/, loader: 'ts-loader'}
    ]
  },
  ts: {
    compilerOptions: {
      target: argv.argv.es6 ? 'es6' : 'es5'
    }
  },
  plugins: [
    /*    new webpack.optimize.UglifyJsPlugin({
     compress: {
     warnings: false
     },
     test: /\.min\.js$/
     })*/
  ]
};