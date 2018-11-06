import Router from 'koa-router';
import userModel from '../../lib/mysql';
import moment from 'moment';

const router = new Router();

//查询回复内容
router.get('/system/replys/:commentId', async(ctx, next) => {
  await userModel.findReplyById(ctx.params.commentId)
    .then((res) => {
      ctx.body = {
        success: true,
        msg: '查询回复成功',
        data: res
      }
    }).catch((err) => {
      console.log(err);
      ctx.body = {
        msg: err
      }
    });
});

//添加回复
router.post('/system/replys/insert', async(ctx, next) => {
  const params = ctx.request.body;

  await userModel.insertReply(
    [params.primaryName, params.secondaryName, params.commentId, params.primaryAvator, params.secondaryAvator, params.content, moment().format('YYYY-MM-DD HH:mm:ss')]
  ).then((res) => {
    ctx.body = {
      success: true,
      msg: '回复成功',
      data: res[0]
    }
  }).catch((err) => {
    console.log(err);
    ctx.body = {
      msg: err
    }
  })
});

export default router;