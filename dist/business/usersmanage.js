'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 用户业务类

var UsersManage = function () {
  function UsersManage() {
    _classCallCheck(this, UsersManage);
  }

  /**
   * 添加一个用户
   * @param  {http请求对象} req
   * @param  {HTTP响应对象} res
   * @param  {中间件转发} next
   */


  _createClass(UsersManage, [{
    key: 'add',
    value: function add(req, res, next) {
      var name = req.body ? req.body.name : '';
      var age = req.body ? req.body.age : '';
      var user = new _user2.default({ 'name': name, 'age': age });
      user.save(function (err) {
        if (err) {
          res.json({ IsSuccess: false, Message: '添加失败' });
        } else {
          res.json({ IsSuccess: true, Message: '添加成功' });
        }
      });
    }

    /**
     * @param  {} req
     * @param  {} res
     * @param  {} next
     */

  }, {
    key: 'del',
    value: function del(req, res, next) {
      var name = req.body ? req.body.name : '';
      _user2.default.remove({ 'name': name }, function (err) {
        if (err) {
          res.json({ IsSuccess: false, Message: '删除失败' });
        } else {
          res.json({ IsSuccess: true, Message: '删除成功' });
        }
      });
    }
  }, {
    key: 'update',
    value: function update(req, res, next) {
      var name = req.body ? req.body.name : '';
      var age = req.body ? req.body.age : '';
      _user2.default.findOne({ 'name': name }, function (err, user) {
        if (err) {
          res.json({ IsSuccess: false, Message: '获取用户失败。' });
        }
        if (user) {
          user.age = age;
          user.save(function (err) {
            if (err) {
              res.json({ IsSuccess: false, Message: '更新失败' });
            } else {
              res.json({ IsSuccess: true, Message: '更新成功' });
            }
          });
        };
      });
    }
  }, {
    key: 'list',
    value: function list(req, res, next) {
      _user2.default.find({}, 'name age', function (err, userList) {
        res.json({ IsSuccess: true, UserList: userList });
      });
    }
  }, {
    key: 'findOne',
    value: function findOne(req, res, next) {
      var name = req.params ? req.params.name : '';
      _user2.default.findOne({ name: name }, 'name age', function (err, user) {
        if (err) {
          res.json({ IsSuccess: false, Message: '获取详情失败' });
        }
        if (user) {
          res.json(user);
        } else {
          res.json({ IsSuccess: false, Message: '获取详情失败' });
        }
      });
    }
  }]);

  return UsersManage;
}();

exports.default = UsersManage;
;
//# sourceMappingURL=usersmanage.js.map