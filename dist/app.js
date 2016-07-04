'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require('./controllers/index.js');

var _index2 = _interopRequireDefault(_index);

var _users = require('./controllers/users.js');

var _users2 = _interopRequireDefault(_users);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _zlib = require('zlib');

var _zlib2 = _interopRequireDefault(_zlib);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect('mongodb://localhost/test');
var data = "";
// 读取流
var readStream = _fs2.default.createReadStream('d:\\test.txt');
readStream.on('data', function (chunk) {
  data += chunk;
});

readStream.on('end', function () {
  console.log(data);
});

readStream.on('error', function (err) {
  console.log(err.stack);
});

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
var rs1 = _fs2.default.createReadStream('d:\\test.txt');
rs1.pipe(_zlib2.default.createGzip()).pipe(_fs2.default.createWriteStream('d:\\gzip.zip'));
var app = (0, _express2.default)();

// view engine setup
app.set('views', _path2.default.join(__dirname, 'views/'));
app.engine('html', _ejs2.default.renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use(_express2.default.static(_path2.default.join(__dirname, 'public'), { 'etag': false, 'lastModified': false, 'maxAge': 1000 }));

app.use('/', _index2.default);
app.use('/users', _users2.default);

// 全局错误捕获
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//开发环境错误捕获
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

//生产环境错误捕获
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// http服务监听3000端口
app.listen(3000, 'localhost', function (message) {
  console.log('listen on port 3000');
});

exports.default = app;
//# sourceMappingURL=app.js.map