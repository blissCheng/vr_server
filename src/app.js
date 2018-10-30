import Koa from 'koa';
import bodyParser from 'koa-bodyparser'; //表单解析
import session from 'koa-session-minimal';
import MysqlStore from 'koa-mysql-session';
import Router from 'koa-router';
import cors from 'koa2-cors';
import config from './config/default';
const path = require('path');
const app = new Koa();
const router = new Router();

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
  store: new MysqlStore(sessionMysqlConfig)
}))

//跨域
app.use(cors());

router.get('/login', async(ctx) => {
  let query = ctx.query;
  ctx.body = {
    query
  }
});

app.use(router.routes())
    .use(router.allowedMethods());

app.listen(9000);