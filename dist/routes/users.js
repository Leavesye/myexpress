'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('users');
});

// 添加用户
router.get('/add', function (req, res, next) {
  var user = new _user2.default();
  user.name = "yesong";
  user.age = 25;
  user.save(function (err) {
    if (err) {
      console.log(err);
    }
  });
});

// 删除用户
router.get('/delete', function (req, res, next) {
  _user2.default.remove({ 'name': 'yesong' }, function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.render('users');
});

// 更新用户信息
router.get('/update', function (req, res, next) {
  _user2.default.findOne({ 'name': 'yesong' }, function (err, model) {
    if (err) {
      console.log(err);
      return;
    }
    if (model) {
      model.name = 'laiqiang';
      model.save(function (err) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
});

// 查找用户列表
router.get('/list', function (req, res, next) {
  _user2.default.find({ 'name': 'yesong' }, 'name', function (err, model) {
    if (err) {
      console.log(err);
      return;
    }
    res.json(model);
  });
});

exports.default = router;
//# sourceMappingURL=users.js.map