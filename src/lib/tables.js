const tables = {
  users: `create table if no exists users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    avator VARCHAR(100) NOT NULL,
    moment VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
  );`,

  posts: `create table if no exists posts(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    title TEXT(0) NOT NULL,
    tags VARCHAR(100) NOT NULL,
    moment VARCHAR(100) NOT NULL,
    comments VARCHAR(200) NOT NULL DEFAULT '0',
    pv VARCHAR(40) NOT NULL DEFAULT '0',
    PRIMARY KEY (id)
  );`,

  comment: `create table if no exists comment(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    content TEXT(0) NOT NULL,
    moment VARCHAR(40) NOT NULL,
    postid VARCHAR(40) NOT NULL,
    avator VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
  );`
}

export default tables;