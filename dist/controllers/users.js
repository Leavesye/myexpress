'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _usersmanage = require('../business/usersmanage');

var _usersmanage2 = _interopRequireDefault(_usersmanage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var users = new _usersmanage2.default();
/* GET users listing. */
router.get('/', function (req, res, next) {
  console.info(req.xhr);
  res.render('users');
});

// 添加用户
router.post('/add', users.add);

// 删除用户
router.post('/delete', users.del);

// 更新用户信息
router.post('/update', users.update);

// 查找某个用户列表
router.get('/findOne/:name', users.findOne);

// 查找用户列表
router.get('/list/', users.list);

exports.default = router;
//# sourceMappingURL=users.js.map