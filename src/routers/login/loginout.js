import Router from 'koa-router';

const router = new Router();

router.get('/loginOut', async(ctx, next) => {
  ctx.session = {};
  ctx.body = {
    success: true,
    msg: '请求成功'
  }
});
export default router;