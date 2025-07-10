const http = require('http');

const fs = require('fs'); // fs 모듈 설치

const {exec} = require('child_process'); // child process 모듈 설치

const server = http.createServer((request, response) => {

  if (request.method === 'POST' && request.url === '/code') {

    let body = '';
    request.on('data', chunk => body += chunk);

    request.on('end', () => {
      //console.log('받은 데이터:', body);

      fs.writeFile('./hello.py', body, 'utf8', (err) => {

        if(err){
          
          response.writeHead(500, { 'Content-Type': 'text/plain'});
          response.end('파일 저장 중 오류 발생');

        } else{

          exec('python3 hello.py', (error, stdout, stderr) => { // 생성한 python 파일 실행하기

            if(error){
              response.writeHead(500, { 'Content-Type': 'text/plain'});
              return response.end(`실행 오류 : ${error.message}`);
            }

            if(stderr){
              response.writeHead(200, { 'Content-Type': 'text/plain' });
              return response.end(`stderr: ${stderr}`);
            }

            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end(`${stdout}`); // body가 아니라 stdout을 사용해야지, python 실행 결과가 출력됨!

          });
        }

      }); // fs로 python 파일 생성
    });

  } else {
    response.writeHead(404);
    response.end('Not Found');
  }

});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});