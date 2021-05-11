// 8-55
/**
 * 지금까지는 next 에 내장된 웹 서버를 사용했다.
 * 내장된 웹 서버를 사용하지 않고 웹 서버를 직접 띄우면 좀 더 많은 일을 할 수 있다.
 * 예를 들어, 내장된 웹 서버는 서버사이드 렌더링 결과를 캐싱할 수 없지만
 * 직접 띄운 웹 서버에서는 캐싱을 통해 보다 많은 트래픽을 처리할 수 있다.
 */
const express = require('express');
const next = require('next');

const port = 3000;
// 1. NODE_ENV 환경 변수에 따라 개발 모드와 프로덕션 모드를 구분한다.
const dev = process.env.NODE_ENV !== 'production';
// 2. next 를 실행하기 위해 필요한 객체와 함수를 생성한다.
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // 3. next의 준비과정이 끝나면 입력된 함수를 실행한다.
  const server = express();

  server.get('/page/:id', (req, res) => {
    // 4. express 웹 서버에서 처리할 url 패턴을 등록한다.
    // 여기서는 /page/1 요청이 들어오면 /page1으로 redirect 한다.
    res.redirect(`page${req.params.id}`);
  });

  server.get('*', (req, res) => {
    // 5. 나머지 모든 요청은 handle 함수가 처리하도록 한다. 
    // 만약 4 가 없다면 8-55는 next 에 내장된 웹 서버와 같은 일을 한다.
    return handle(req, res);
  });

  server.listen(port, (err) => {
    // 6
    if (err) throw err;
    console.log(`>>>> Ready on http://localhost:${port}`);
  });
});
