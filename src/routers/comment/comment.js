import Router from 'koa-router';
import userModel from '../../lib/mysql.js';
import moment from 'moment';
const router = new Router();

//获取全部评论
router.get('/system/comments', async(ctx, next) => {
  await userModel.findComments()
    .then((res) => {
      ctx.status = 200;
      ctx.body = {
        success: true,
        msg: '查询评论成功',
        data: res
      }
    }).catch((err) => {
      console.log(err);
    })
});
//新增评论
router.post('/system/comments/insert', async(ctx, next) => {
  const params = ctx.request.body;
  await userModel.insertComment([
    params.name, params.content, moment().format('YYYY-MM-DD HH:mm:ss'), params.postId, params.avator
  ]).then(async(res) => {
    await userModel.updatePostComment(params.postId)
      .then((result) => {
        
      });
    ctx.body = {
      success: true,
      msg: '新增评论成功',
      data: res[0]
    };
  }).catch((err) => {
    console.log(err)
  });
});

export default router;