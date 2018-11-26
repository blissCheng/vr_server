const http = require('http');
const path = require('path');
const crypto = require('crypto'); //加密模块
const child_process = require('child_process');

const { spawn } = child_process;
//创建一个子进程
const run_cmd = (cmd, args, callback) => {
  const child = spawn(cmd, args);
  let resp = '';
  child.stdout.on('data', (data) => {
    resp = data;
  });

  child.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  child.on('close', () => {
    callback(resp);
  })
};

http.createServer((req, res) => {
  req.setEncoding('utf8');
  let postData = '';
  req.on('data', (data) => {
    postData += data;
  });
  req.on('end', () => {
    let query = JSON.parse(postData);
    const signature = 'sha1=' + crypto.createHmac('sha1', 'vr_server').update(postData).digest('hex');  //请求签名，验证是否为github请求
    //验证签名 
    if (signature === req.headers['x-hub-signature']) {

      //git pull 更新
      run_cmd('git', [ 'pull' ], (text) => {
        console.log(text.toString());

        //pm2 start index 重启服务
        run_cmd('pm2', [ 'start', path.join(__dirname, './index.js') ], (text) => {
          console.log(text.toString());

          res.statusCode = 200;
          res.write(JSON.stringify({
            success: true,
            msg: '自动更新完成'
          }));
          console.log('服务重启成功');
        })
      });
    }
  })
}).listen(9001);