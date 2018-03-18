const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge')

const serverConfig = merge({}, baseConfig, {
    target: 'node',
    entry: './src/entry-server.js',
    output: {
        path: path.join(process.cwd(), 'dist/server'),
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
      alias: {
        'fetch': path.resolve(__dirname, '../src/utils/fetch-server.js')
      }
    },
    externals: nodeExternals()
});

module.exports = serverConfig;