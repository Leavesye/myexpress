import express from 'express';
import mongoose from 'mongoose';
import UsersManage from '../business/usersmanage';

const router = express.Router();
let users = new UsersManage();
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
router.get('/findOne/:name', users.findOne)

// 查找用户列表
router.get('/list/', users.list)

export default router;
