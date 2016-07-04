'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
/* GET home page.  无限转发流*/
router.get('/', function (req, res, next) {
  res.render('index.html', {
    users: [{
      name: 'ys'
    }, {
      name: 'lq'
    }, {
      name: 'zj'
    }, {
      name: 'xgy'
    }]
  });
});
router.post('/show', function (req, res, next) {
  var body = req.body;
});

exports.default = router;
//# sourceMappingURL=index.js.map