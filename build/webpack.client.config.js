const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

const baseConfig = {
  entry: {
    app: ['./src/app.js'],
    vendor: [
      'vue',
      'vue-router'
    ]
  },

  output: {
    path: path.join(process.cwd(), '/dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },

  resolve: {
      extensions: ['.js', '.vue']
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[hash:7].[ext]'
        }
      }
    ]
  }
}

if (process.argv.includes('--development')) {
  baseConfig.entry.app.push('webpack-hot-middleware/client');

  Object.assign(baseConfig, {
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new htmlWebpackPlugin({
        template: './src/index.template.html'
      })
    ]
  });
} else {
  Object.assign(baseConfig, {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': 'production'
      }),
      //降低文件大小
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        comments: false
      }),
      new htmlWebpackPlugin({
        template: './src/index.template.html'
      }),
      new extractTextPlugin('[name].[contenthash].css')
    ]
  });
}

module.exports = baseConfig;