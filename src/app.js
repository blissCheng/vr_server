import Koa from 'koa';
import bodyParser from 'koa-bodyparser'; //表单解析
import session from 'koa-session-minimal';
import MysqlStore from 'koa-mysql-session';
import staticCache from 'koa-static-cache';
import Router from 'koa-router';
import cors from 'koa2-cors';
import config from './config/default';
import userModel from './lib/mysql';
//routers
import loginUpRouter from './routers/login/loginup';
import loginInRouter from './routers/login/loginin';
import loginOutRouter from './routers/login/loginout';
import postRouter from './routers/post/post';
import commentRouter from './routers/comment/comment';
//
const path = require('path');
const app = new Koa();
const sessionValidity = 24 * 60 * 60;

console.log('avvv');

//判断是否为post模块接口
const isPosts = (url) => {
  const fragments = url.split('/');
  return fragments.indexOf('posts') > -1;
}

//session存储配置
const sessionMysqlConfig = {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST
}

//配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig),
  maxAge: sessionValidity,
  rolling: true, //强制重置cookie
  httpOnly: true
}, app));

//跨域
app.use(cors());

//使用缓存, 配置静态资源
app.use(staticCache(path.join(__dirname, './public'), { dynamic: true }, {
  maxAge: 365 * 24 * 60 * 60
}));

app.use(staticCache(path.join(__dirname, './images'), { dynamic: true }, {
  maxAge: 365 * 24 * 60 * 60
}));

//解析表单
app.use(bodyParser());

//验证session， 拦截response;
app.use(async (ctx, next) => {
  const cookie = 'USER_SID:' + ctx.cookies.get('USER_SID');
  await next();
  if (isPosts(ctx.path)) {
    return
  };
  await userModel.findSession(cookie)
    .then(async (res) => {
      
      const validity = (res.length < 1 || new Date() - res[0].expires > sessionValidity) && ctx.path !== '/loginIn' && ctx.path !== '/loginUp';
      if (validity) {
        ctx.status = 401;
        ctx.body = {
          success: false,
          msg: '登录验证已过期，请重新登录'
        };
        if (res.length > 0) {
          ctx.session = {};
        }
      }
    });
});

//请求计时
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method}-接口${ctx.url} - 用时:${ms}ms`);
});
//路由
app
  .use(loginUpRouter.routes())
  .use(loginInRouter.routes())
  .use(loginOutRouter.routes())
  .use(postRouter.routes())
  .use(commentRouter.routes());

app.listen(9000);

console.log('服务启动成功!')