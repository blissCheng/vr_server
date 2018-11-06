vr-server(vr-blog后台服务)

技术栈： nodejs + koa2 + mysql 及koa2周边生态中间件。

node版本 v9.8.0

#### 此服务仅用于服务前端评论系统，不涉及后台html渲染。其中post文章模块仅用于存储读取文章标题，浏览数等，不提供内容存储功能。所有的md文件由前端系统运行前统一解析渲染。

## 使用

```
git@github.com:blissCheng/vr_server.git

npm install && npm install -g pm2

pm2 start index.js
```

注意： 在启动前请先更改mysql连接配置， 配置目录 /src/config/default.js

## 用户模块

### user

字段名 | 数据类型 | 定义 
:----:|:------:|:----:
id     | int      | 主键	
name   | string   | 用户名
pass   | string   | 用户密码
avator | string   | 头像
moment | YY-MM-DD | 创建时间


### 注册接口  /loginUp

```
method: POST
params: name, password, repeatpass, avator(用户头像base64)
```

### 登录接口 /loginIn

```
method: POST
params: name, password
response: #user
```

### 登出接口 /loginOut

```
method: GET
params: 无
```

## 文章模块

### post

字段名 | 数据类型 | 定义 
:----:|:------:|:----:
id      | int      | 主键	
title   | string   | 标题
tags    | string   | 标签
moment  | YY-MM-DD | 创建时间
comments| string   | 评论数
pv      | string   | 浏览数


### 新增文章 /system/posts/insert

```
method: POST
params: title, tags
response: #post
```

### 分页文章信息 /system/posts

```
method: POST
params: pageNo, pageSize
response: Array(#post)
```

### 获取文章详情 /system/posts/:id

```
method: GET
params: id - 文章id
response: #post
```

## 评论模块

### comment

字段名 | 数据类型 | 定义 
:----:|:------:|:----:
id      | int      | 主键	
name    | string   | 用户名
content | string   | 内容
postId  | int      | 文章id
avator  | string   | 头像

### reply

字段名 | 数据类型 | 定义 
:----:|:------:|:----:
id             | int      | 主键	
primaryName    | string   | 姓名（主）
secondaryName  | string   | 姓名（次）
commentId      | int      | 评论id
primaryAvator  | string   | 头像
secondaryAvator| string   | 头像
content        | string   | 回复内容
moment         | YY-MM-DD | 创建时间


### 评论列表 /system/comments

```
method: GET
response: Array(#comment)
```

### 新增评论 /system/comments/insert

```
method: POST
params: name, postId, avator
respose: #comment
```

### 回复列表  /system/replys/:commentId

```
method: GET
response: Array(#reply)
```

### 新增回复

```
method: POST
params: primaryName, secondaryName, commentId, primaryAvator, seondaryAvator, content
response: #reply
```

















