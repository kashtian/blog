const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.config');

const serverConfig = Object.assign({}, baseConfig, {
    target: 'node',
    entry: './src/entry-server.js',
    output: {
        path: path.join(process.cwd(), 'dist/server'),
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2'
    },
    externals: nodeExternals()
});

module.exports = serverConfig;