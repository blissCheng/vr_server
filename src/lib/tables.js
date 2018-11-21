const tables = [
  //users
  `create table if not exists users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    avator VARCHAR(100) NOT NULL,
    moment VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
  );`,
  //posts
  `create table if not exists posts(
    id INT NOT NULL AUTO_INCREMENT,
    title TEXT(0) NOT NULL,
    tag VARCHAR(100) NOT NULL,
    time VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    content TEXT(0) NOT NULL,
    introduce TEXT(0) NOT NULL,
    moment VARCHAR(100) NOT NULL,
    comments INT NOT NULL DEFAULT 0,
    pv INT NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
  );`,
  //comment
  `create table if not exists comments(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    content TEXT(0) NOT NULL,
    moment VARCHAR(40) NOT NULL,
    postId INT NOT NULL,
    avator VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
  );`,
  //replys
  `create table if not exists replys(
    id INT NOT NULL AUTO_INCREMENT,
    primaryName VARCHAR(100) NOT NULL,
    secondaryName VARCHAR(100) NOT NULL,
    commentId INT NOT NULL,
    primaryAvator VARCHAR(40) NOT NULL,
    secondartAvator VARCHAR(40) NOT NULL,
    content TEXT(0) NOT NULL,
    moment VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
  );`
]
export default tables;