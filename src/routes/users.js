import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});

// 添加用户
router.get('/add', function (req, res, next) {
  var user = new User();
  user.name = "yesong";
  user.age = 25;
  user.save((err) => {
    if (err) {
      console.log(err);
    }
  });
});

// 删除用户
router.get('/delete', function (req, res, next) {
  User.remove({ 'name': 'yesong' }, (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.render('users');
});

// 更新用户信息
router.get('/update', function (req, res, next) {
  User.findOne({ 'name': 'yesong' }, (err, model) => {
    if (err) {
      console.log(err);
      return;
    }
    if (model) {
      model.name = 'laiqiang';
      model.save((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  })
});

// 查找用户列表
router.get('/list', (req, res, next) => {
  User.find({ 'name': 'yesong' }, 'name', (err, model) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json(model);
  })
})

export default router;
