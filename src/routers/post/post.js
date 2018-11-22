import Router from 'koa-router';
import userModel from '../../lib/mysql.js';
import moment from 'moment';
const router = new Router();

//通过category划分
const divideByCategory = (src) => {
  let result = {};
  src.forEach((v) => {
    if (!result[v.category]) {
      result[v.category] = []
    }
    result[v.category].push(v);
  });
  return result;
}
//通过tag划分
const divideByTag = (src) => {
  let result = {};
  src.forEach((v) => {

    let tags = v.tag.split(',');
    tags.forEach((i) => {
      if (!result[i]) {
        result[i] = []
      };
      result[i].push(v);
    })
  });

  return result;
}

//新增文章
router.post('/system/posts/insert', async(ctx, next) => {
  const post = ctx.request.body;
  await userModel.insertPost(
    [moment().format('YYYY-MM-DD HH:mm:ss'), post.title, post.tag, post.category, post.introduce, post.content, post.time, post.name]
  ).then(async(res) => {
    ctx.body = {
      success: true,
      msg: '新增文章成功',
      data: res[0]
    }
  }).catch((err) => {
    console.log(err);
    ctx.body = {
      msg: err
    }
  });
});

//查找分页文章
router.post('/system/posts', async(ctx, next) => {
  const params = ctx.request.body;

  //如果存在分页参数，返回分页信息
  if (params.pageNo !== undefined && params.pageSize) {
    await userModel.findPostsByPage(ctx.request.body.pageNo, ctx.request.body.pageSize)
    .then((res) => {
      ctx.status = 200;
      ctx.body = {
        success: true,
        msg: '查询成功',
        data: res
      }
    }).catch((err) => {
      console.log(err);
      ctx.body = {
        msg: err
      }
    })
  } else{
    //查询全部文章
    await userModel.findPosts()
      .then((res) => {
        ctx.status = 200;
        ctx.body = {
          success: true,
          msg: '查询全部文章成功',
          data: res
        };
        //查询cateory或者tag
        if (params.type) {
          switch (params.type) {
            case 1:
              ctx.body.data = divideByCategory(res);
              break;
            case 2:
              ctx.body.data = divideByTag(res);
              break;
          }
        }
      }).catch((err) => {
        console.log(err)
      })
  }
});

//根据id查找文章
router.get('/system/posts/:id', async(ctx, next) => {
  await userModel.findPostById(ctx.params.id)
    .then(async(res) => {
      //更新文章浏览数
      const pv = res[0].pv + 1;
      await userModel.updatePostView([pv, ctx.params.id])
        .then((result) => {
          ctx.status = 200;
          ctx.body = {
            success: true,
            msg: '查询成功',
            data: res[0]
          };
          ctx.body.data.pv += 1;
        });
    }).catch((err) => {
      console.log(err);
      ctx.body = {
        msg: err
      }
    })
});

export default router;