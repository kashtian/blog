const express = require('express');
const webpack = require('webpack');
const clientConfig = require('./build/webpack.client.config');

const { port } = require('./config/sys.config');

const app = express();

app.use(express.static('public'))

// 热替换
if (process.argv.includes('--development')) {
  const compiler = webpack(clientConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})