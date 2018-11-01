import Koa from 'koa';
import bodyParser from 'koa-bodyparser'; //表单解析
import session from 'koa-session-minimal';
import MysqlStore from 'koa-mysql-session';
import staticCache from 'koa-static-cache';
import Router from 'koa-router';
import cors from 'koa2-cors';
import config from './config/default.js';
//routers
import signupRouter from './routers/login/signup.js';
import signinRouter from './routers/login/signin.js';
//
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
}));

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

//路由
app
  .use(signupRouter.routes())
  .use(signinRouter.routes());

app.listen(9000);


console.log('服务启动成功!')