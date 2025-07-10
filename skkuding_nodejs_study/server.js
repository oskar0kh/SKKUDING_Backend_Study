const http = require('http');

const server = http.createServer((request, response) => {

  if (request.method === 'POST' && request.url === '/code') {

    let body = '';
    request.on('data', chunk => body += chunk);

    request.on('end', () => {
      //console.log('받은 데이터:', body);
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end(`받은 데이터 : ${body}`);
    });

  } else {
    response.writeHead(404);
    response.end('Not Found');
  }

});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});