import mysql from 'mysql';
import config from '../config/default.js';
import tables from './tables.js';

const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
});

const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });

        connection.release();
      }
    })
  })
};

const createTable = (sql, values) => {
  return query(sql, [])
};

tables.forEach((v) => {
  createTable(v);
})

class Methods {
  constructor() {

  }
  //删除session
  deleteSession(id) {
    let _sql = `delete from _mysql_session_store where id="${id}"`;
    return query(_sql);
  };
  //查询session
  findSession(id) {
    let _sql = `select * from _mysql_session_store where id="${id}"`;
    return query(_sql);
  };
  //注册用户
  insertUser(value) {
    let _sql = 'insert into users set name=?,pass=?,avator=?,moment=?;';
    return query(_sql, value);
  };
  //删除用户
  deleteUser(id) {
    let _sql = `delete from users where id="${id}";`;
    return query(_sql)
  }
  //查找用户
  findUser(name) {
    let _sql = `select * from users where name="${name}";`;
    return query(_sql)
  }
  //新增文章
  insertPost(value) {
    let _sql = 'insert into posts set name=?moment=?title=?tags=?;'
    return query(_sql, value);
  }
  //更新文章评论数
  updatePostComment(value) {
    let _sql = `update posts set comments=? where id=?;`;
    return query(_sql, value);
  }
  //更新浏览数
  updatePostPv(value) {
    let _sql = 'update posts set pv=? where id=?;';
    return query(_sql, value);
  }
}

export default new Methods();