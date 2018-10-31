import Router from 'koa-router';
import userModel from '../../lib/mysql.js';
import md5 from 'md5';
import moment from 'moment';

const fs = require('fs');

const router = new Router();

router.post('/signup', async(ctx, next) => {
  let user = {
    name: ctx.request.body.name,
    pass: ctx.request.body.password,
    repeatpass: ctx.request.body.repeatpass,
    avator: ctx.request.body.avator
  }
  await userModel.findUser(user.name)
    .then(async(result) => {
      if (result.length > 0) {
        try {
          throw Error('用户已存在')
        } catch (err) {
          console.log(err)
        }
      } else if(user.pass !== user.repeatpass || user.pass === '') {
        ctx.body = {
          data: 2
        };
        console.log('密码无效');
      } else {
        let base64Data = user.avator.replace(/^data:image\/\w+;base64,/, "");
        let dataBuffer = new Buffer(base64Data, 'base64');
        let getName = Number(Math.random().toString().substr(3).toString(36) + Date.now())

        await fs.watchFile('../../public/images' + getName + '.png', dataBuffer, (err) => {
          if (err) throw err;
          console.log('头像保存成功');
        });

        await userModel.insertUser(
          [user.name, md5(user.pass), getName, moment.format('YYYY-MM-DD HH:mm:ss')]
        ).then((res) => {
          console.log('用户注册成功');
          ctx.body = {
            data: 3
          };
        })
      }
    })
});

export default router;