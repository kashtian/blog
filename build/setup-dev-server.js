const path = require('path');
const webpack = require('webpack');
const MFS = require('memory-fs');
const clientConfig = require('./webpack.client.config');
const serverConfig = require('./webpack.server.config');

module.exports = function (app, opts) {
    const clientCompiler = webpack(clientConfig);
    const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        stats: {
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
            colors: true
        }
    })
    app.use(devMiddleware);
    clientCompiler.plugin('done', () => {
        const fs = devMiddleware.fileSystem;
        let filePath = path.join(clientConfig.output.path, 'index.html');
        if (fs.existsSync(filePath)) {
            opts.indexUpdated(fs.readFileSync(filePath, 'utf-8'))
        }        
    })

    app.use(require('webpack-hot-middleware')(clientCompiler));

    const serverCompiler = webpack(serverConfig);
    const mfs = new MFS();
    let serverPath = path.join(serverConfig.output.path, serverConfig.output.filename);
    serverCompiler.outputFileSystem = mfs;    
    serverCompiler.watch({}, (err, stats) => {
        if (err) throw err;
        stats = stats.toJson();
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(err => console.warn(err))
        if (mfs.existsSync(serverPath)) {
            opts.bundleUpdated(mfs.readFileSync(serverPath, 'utf-8'));
        }
    })
}