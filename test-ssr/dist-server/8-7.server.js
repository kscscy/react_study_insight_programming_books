// // 8-7
// import express from 'express';
// import fs from 'fs';
// import path from 'path';
// // 1. react-dom 패키지의 server 폴더 밑에 서버에서 사용하는 기능이 모여있다.
// import { renderToString } from 'react-dom/server';
// import React from 'react';
// import App from './App';
// // 2. express 객체인 app 변수를 이용해서 미들웨어와 url 경로 설정을 할 수 있다.
// const app = express();
// const html = fs.readFileSync(
//   // 3. 웹팩 빌드 후 생성되는 index.html 파일의 내용을 가져온다.
//   // 서버사이드 렌더링 시 이 내용을 기반으로 새로운 HTML 을 생성할 예정이다.
//   path.resolve(__dirname, '../dist/index.html'),
//   'utf8',
// );
// // 4. url이 /dist 로 시작하는 경우에는 dist 폴더 밑에 있는 정적 파일로 연결한다.
// // 웹팩으로 빌드한 자바스크립트 파일이 이 코드에 의해서 서비스된다.
// app.use('/dist', express.static('dist'));
// // 5. 브라우저가 자동으로 요청하는 favicon.ico 파일이 6번에서 처리되지 않도록 한다.
// app.get('/favicon.ico', (req, res) => res.sendStatus(204));
// // 6. 나머지 모든 경우를 처리하는 함수를 등록한다.
// app.get('*',(req,res) => {
//   // 7. renderToString 함수를 이용해서 App 컴포넌트를 렌더링 한다.
//   // renderToString 함수는 문자열을 반환한다.
//   // 현재는 어떤 요청이 들어와도 home 페이지를 렌더링한다.
//   const renderString = renderToString(<App page="home" />);
//   const result = html.replace(
//     // 8. 렌더링된 결과를 반영해서 HTML 을 완성한다.
//     '<div id="root"></div>',
//     `<div id="root">${renderString}</div>`,
//   );
//   // 9. 완성된 HTML 을 클라이언트에 전송한다.
//   res.send(result);
// });
// // 10. 3000번 포트를 통해 클라이언트의 요청을 기다린다.
// app.listen(3000);
"use strict";