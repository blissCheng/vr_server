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
    let _sql = 'insert into posts set name=?,moment=?,title=?,tags=?;';
    return query(_sql, value);
  }
  //查询文章
  findPosts() {
    let _sql = `select * from posts;`;
    return query(_sql);
  }
  //查询分页文章
  findPostsByPage(pageNo, pageSize) {
    let _sql = `select * from posts limit ${(pageNo - 1) * 10},${pageSize};`;
    return query(_sql);
  }
  //根据id查找文章
  findPostById(id) {
    let _sql = `select * from posts where id="${id}";`;
    return query(_sql);
  }
  //更新文章浏览数
  updatePostView(value) {
    let _sql = `update posts set pv=? where id=?;`;
    return query(_sql, value);
  }
  //更新文章评论数
  updatePostComment(id) {
    let _sql = `update posts set comments=comments+1 where id="${id}";`;
    return query(_sql);
  }
  //发表评论
  insertComment(value) {
    let _sql = `insert into comments set name=?,content=?,moment=?,postId=?,avator=?;`;
    return query(_sql);
  }
  //添加回复评论
  insertReply(value) {
    let _sql = `insert into replys set primaryName?,secondaryName?,commentId?,primaryAvator?,secondaryAvator?,content?,moment?;`;
    return query(_sql);
  }
  //获取全部评论
  findComments() {
    let _sql = `select * from comments`;
    return query(_sql);
  }
  //根据评论id获取回复内容
  findReplyById(id) {
    let _sql = `select * from replys where commentId="${id}";`;
    return query(_sql);
  }
}

export default new Methods();