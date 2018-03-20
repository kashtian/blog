const fs = require('fs');
const path = require('path');
const express = require('express');
const serialize = require('serialize-javascript');
const LRU = require('lru-cache');
const { createBundleRenderer } = require('vue-server-renderer');
const apis = require('./api');
const log4js = require('log4js');
const bodyParser = require('body-parser');
const { redisAuthFilter } = require('./api/middleware');

const { port } = require('./config/sys.config');

// init log4js
log4js.configure('./config/log4js.json');
const log = log4js.getLogger('route_error');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(redisAuthFilter);
app.use(express.static('public'))
app.use('/api', apis);

let indexHtml, renderer;
if (process.argv.includes('--development')) {
  require('./build/setup-dev-server')(app, {
    indexUpdated: html => indexHtml = getIndexInfo(html),
    bundleUpdated: bundle => renderer = createRenderer(bundle)
  })
} else if (!process.argv.includes('--test')) {
  indexHtml = getIndexInfo(fs.readFileSync(path.join(process.cwd(), '/dist/static/index.html'), 'utf-8'));
  renderer = createRenderer(fs.readFileSync(path.join(process.cwd(), '/dist/server/server-bundle.js'), 'utf-8'));
  app.use('/static', express.static(path.join(process.cwd(), 'dist/static')));
}

function createRenderer(serverBundle) {
  return createBundleRenderer(serverBundle, {
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  })
}

function getIndexInfo(html) {
  let marker = '<!-- APP -->';
  let i = html.indexOf(marker);
  return {
    head: html.slice(0, i),
    tail: html.slice(i + marker.length)
  }
}

app.get('*', (req, res) => {
  if(!renderer) {
      return res.end('waiting for compilation... refresh in a moment.');
  }
  let context = {
    url: req.path
  }
  let stream = renderer.renderToStream(context);

  res.setHeader('Content-Type', 'text/html');

  stream.once('data', () => {
    res.write(indexHtml.head.replace(/\{\{title\}\}/, context.title));
  })

  stream.on('data', chunk => {  
    res.write(chunk)
  })

  stream.on('end', () => {
    res.write(`
      <script>
        window.__INITIAL_STATE__ = ${serialize(context.initialState, {isJSON: true})}
      </script>
    `)
    res.end(indexHtml.tail);
  })

  stream.on('error', err => {
    if (err && err.code == '404') {
      log.error(req.path, err.message);
      res.status(404).end('404 | Page Not Found');
      return;
    }
    log.error(req.path, err.message);
    res.status(500).end('Internal Error 500');
    console.error(`error during render: ${req.path}`);
    console.error(err);
  })
})

app.use((req, res, next) => {
  var err = new Error('资源没有找到');
  err.status = 404;
  next(err);
})

app.use((err, req, res, next)=> {
  log.error(req.path, err.message);
  res.status(err.status || 500);
  res.json({
      code: err.status || 500,
      message: err.message || "服务器内部错误"
  });
});

let server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})

server.on('timeout', err => {
  log.error('timeout: ', err)
})

module.exports = app;