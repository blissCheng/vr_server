import Router from 'koa-router';
import userModel from '../../lib/mysql.js';

const router = new Router();

router.post('/loginin', async(ctx, next) => {
  let user = {
    name: ctx.request.body.name,
    password: ctx.request.body.password
  };

  await userModel.findUser(user.name)
    .then((res) => {
      if (res[0].name === user.name && user.password.toString() === res[0].pass) {
        ctx.status = 200,
        ctx.body = {
          success: true,
          msg: '登录成功',
          data: res[0]
        },
        ctx.session.username = res[0].name;
      } else {
        ctx.status = 400,
        ctx.body = {
          success: false,
          msg: '账号或密码不正确'
        }
      }
    })
});

export default router;
