import mysql from 'mysql';
import config from '../config/default.js';
import { resolve } from 'dns';

const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
});

class CreateTable {

  users =
    `create table if no exists users(
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      pass VARCHAR(100) NOT NULL,
      avator VARCHAR(100) NOT NULL,
      moment VARCHAR(100) NOT NULL,
      PRIMARY KEY (id)
    )`;
    
  
}
class Methods {
  constructor() {

  }

  query = (sql, values) => {
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
  }
}

export default new Methods();