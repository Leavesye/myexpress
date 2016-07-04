import express from 'express';
import app  from '../app';
const router = express.Router();
/* GET home page.  无限转发流*/
router.get('/', function (req, res, next) {
  res.render('index.html', {
    users: [{
        name: 'ys',
      },
      {
        name: 'lq'
      },
      {
        name: 'zj'
      },
      {
        name: 'xgy'
    }]
  });
});
router.post('/show',(req,res,next) => {
  var body = req.body;
})

export default router;


