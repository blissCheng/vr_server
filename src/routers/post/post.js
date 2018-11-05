import Router from 'koa-router';
import userModel from '../../lib/mysql.js';

const router = new Router();

//新增文章
router.post('/system/posts/insert', async(ctx, next) => {
  const post = ctx.request.body;
  await userModel.insertPost(
    [post.name, post.moment, post.title, post.tags]
  ).then(async(res) => {
    ctx.body = {
      success: true,
      msg: '新增文章成功',
      data: res[0]
    }
  });
});
//查找所有文章
router.get('/system/posts', async(ctx, next) => {
  await userModel.findPosts()
    .then((res) => {
      ctx.status = 200;
      ctx.body = {
        success: true,
        msg: '查询成功',
        data: res
      }
    })
});

//根据id查找文章
router.get('/system/posts/:id', async(ctx, next) => {

  await userModel.findPostById(ctx.params.id)
    .then(async(res) => {
      //更新文章浏览数
      await userModel.updatePostView([ctx.params.id])
        .then((result) => {
          ctx.status = 200;
          ctx.body = {
            success: true,
            msg: '查询成功',
            data: result[0]
          };
        });
    })
});

export default router;