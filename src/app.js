import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import index from './controllers/index.js';
import users from './controllers/users.js';
import ejs from 'ejs';
import http from 'http';
import fs from 'fs';
import zlib from 'zlib';
import util from 'util';

mongoose.connect('mongodb://localhost/test');
let data = "";
// 读取流
let readStream = fs.createReadStream('d:\\test.txt');
readStream.on('data',(chunk) => {
  data += chunk;
})

readStream.on('end',() => {
  console.log(data);
})

readStream.on('error',(err) => {
  console.log(err.stack);
})

// 写入流
// let ws = fs.createWriteStream("d:\\test1.txt");
// ws.write("hello world", 'utf8');
// ws.on('finish', () => {
//   console.log('写入完成。');
// });
// ws.on('error', (err) => {
//   console.log(err.stack);
// });

// 管道流
// let rs1 = fs.createReadStream('d:\\test.txt');
// let ws2 = fs.createWriteStream('d:\\test2.txt');
// rs1.pipe(ws2);

// 链式流
let rs1 = fs.createReadStream('d:\\test.txt');
rs1.pipe(zlib.createGzip()).pipe(fs.createWriteStream('d:\\gzip.zip'))
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), { 'etag': false, 'lastModified': false, 'maxAge': 1000 }));

app.use('/', index);
app.use('/users', users);



// 全局错误捕获
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//开发环境错误捕获
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

//生产环境错误捕获
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// http服务监听3000端口
app.listen(3000,'localhost',(message) => {
  console.log(`listen on port 3000`);
});

export default app;
