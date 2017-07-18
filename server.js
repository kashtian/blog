const express = require('express');
const webpack = require('webpack');
const clientConfig = require('./build/webpack.client.config');

const { port } = require('./config/sys.config');

const app = express();

const compiler = webpack(clientConfig);

app.use(express.static('public'))

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: clientConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(port, () =>{
    console.log(`Listening at http://localhost:${port}`);
})