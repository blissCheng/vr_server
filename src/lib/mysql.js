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

//建表
for (i in tables) {
  createTable(tables[i])
}

class Methods {
  constructor() {

  }

  insertUser = () => {
    
  }
}

export default new Methods();