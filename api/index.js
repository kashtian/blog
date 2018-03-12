const express = require('express');
const { userRouteMap } = require('./user');

const router = express.Router();

router.use('/user', createRouter(userRouteMap))

module.exports = router;

function createRouter(map) {
  let router = express.Router();
  let arr = [];
  for (let key in map) {
    arr = key.split(' ');
    router[arr[0]](arr[1], (req, res) => {
      map[key](req).then(_data => {
        res.json({
          code: 200,
          data: _data
        })
      }).catch(err => {
        res.json({
          code: 100,
          msg: err.message || ''
        })
      })
    })
  }
  return router;
}
