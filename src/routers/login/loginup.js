import Router from 'koa-router';
import userModel from '../../lib/mysql.js';
import md5 from 'md5';
import moment from 'moment';

const fs = require('fs');

const router = new Router();

router.post('/loginup', async(ctx, next) => {
  let user = {
    name: ctx.request.body.name,
    pass: ctx.request.body.password,
    repeatpass: ctx.request.body.repeatpass,
    avator: ctx.request.body.avator
  };
  await userModel.findUser(user.name)
    .then(async(result) => {
      if (result.length > 0) {
        ctx.status = 202;
        ctx.body = {
          success: false,
          msg: '用户已存在'
        }
      } else if(user.pass !== user.repeatpass || user.pass === '') {
        ctx.status = 202;
        ctx.body = {
          success: false,
          msg: '无效密码'
        };
      } else {
        let base64Data = user.avator.replace(/^data:image\/\w+;base64,/, "");
        let dataBuffer = Buffer.from(base64Data, 'base64');
        let getName = Number(Math.random().toString().substr(3).toString(36) + Date.now())

        fs.writeFile('./src/public/images/' + getName + '.png', dataBuffer, (err) => {
          if (err) throw err;
          console.log('头像保存成功')
        });

        await userModel.insertUser(
          [user.name, user.pass, getName, moment().format('YYYY-MM-DD HH:mm:ss')]
        ).then((res) => {
          console.log('用户注册成功');
          ctx.body = {
            success: true,
            msg: '用户注册成功'
          };
        })
      }
    })
});

export default router;