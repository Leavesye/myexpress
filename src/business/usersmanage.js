import User from '../models/user';
import mongoose from 'mongoose';
// 用户业务类
export default class UsersManage {
  constructor() {

  }

  /**
   * 添加一个用户
   * @param  {http请求对象} req
   * @param  {HTTP响应对象} res
   * @param  {中间件转发} next
   */
  add(req,res,next) {
    let name = req.body ? req.body.name : '';
    let age = req.body ? req.body.age : '';
    let user = new User({ 'name': name, 'age': age });
    user.save((err) => {
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
  del(req, res, next) {
    let name = req.body ? req.body.name : '';
    User.remove({ 'name': name }, (err) => {
      if (err) {
        res.json({ IsSuccess: false, Message: '删除失败' });
      } else {
        res.json({ IsSuccess: true, Message: '删除成功' });
      }
    });
  }

  update(req, res, next) {
    let name = req.body ? req.body.name : '';
    let age = req.body ? req.body.age : '';
    User.findOne({ 'name': name }, (err, user) => {
      if (err) {
        res.json({ IsSuccess: false, Message: '获取用户失败。' });
      }
      if (user) {
        user.age = age;
        user.save((err) => {
          if (err) {
            res.json({ IsSuccess: false, Message: '更新失败' });
          } else {
            res.json({ IsSuccess: true, Message: '更新成功' });
          }
        });
      };
    });
  }

  list(req,res,next) {
    User.find({},'name age',(err,userList) => {
      res.json({IsSuccess:true,UserList:userList})
    });
  }

  findOne(req,res,next) {
    let name = req.params ? req.params.name : '';
    User.findOne({name:name},'name age',(err,user) => {
      if (err) {
        res.json({IsSuccess:false,Message:'获取详情失败'});
      }
      if (user) {
        res.json(user);
      } else {
        res.json({IsSuccess:false,Message:'获取详情失败'});
      }
    })
  }
};
