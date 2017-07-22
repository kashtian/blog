const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.base.config');

const clientConfig = Object.assign({}, baseConfig, {
  entry: {
    app: ['./src/entry-client.js'],
    vendor: [
      'vue',
      'vue-router',
      'vuex',
      'vuex-router-sync'
    ]
  },

  output: {
    path: path.join(process.cwd(), '/dist/static'),
    filename: '[name].[chunkhash].js',
    publicPath: '/static'
  }
});

if (process.argv.includes('--development')) {
  clientConfig.entry.app.push('webpack-hot-middleware/client');
  clientConfig.output.filename = '[name].js';

  Object.assign(clientConfig, {
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new htmlWebpackPlugin({
        template: './src/index.template.html'
      })
    ]
  });
} else {
  Object.assign(clientConfig, {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
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

module.exports = clientConfig;