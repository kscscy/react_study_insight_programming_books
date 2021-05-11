// 8-59
// const express = require('express');
// const next = require('next');
// const url = require('url');
// const lruCache = require('lru-cache');
// const fs = require('fs');

// const ssrCache = new lruCache({
//   // 최대 100개의 항목을 저장하고 각 항목은 60초 동안 저장한다.
//   max: 100,
//   maxAge: 1000 * 60,
// });

// const port = 3000;
// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = express();

//   server.get('/page/:id', (req, res) => {
//     // 4. express 웹 서버에서 처리할 url 패턴을 등록한다.
//     // 여기서는 /page/1 요청이 들어오면 /page1으로 redirect 한다.
//     res.redirect(`page${req.params.id}`);
//   });

//   server.get(/^\/page[1-9]/, (req, res) => {
//     // /page1, /page2 요청에 대해 서버사이드 렌더링 결과를 캐싱한다.
//     return renderAndCache(req, res);
//   });

//   server.get('*', (req, res) => {
//     return handle(req, res);
//   });

//   server.listen(port, (err) => {
//     if (err) throw err;
//     console.log(`>>>> Ready on http://localhost:${port}`);
//   });
// });

// const prerenderList = [
//   { name: 'page1', test:'page1',path: '/page1' },
//   { name: 'page2-hello', test:'page2' ,path: '/page2?text=hello' },
//   { name: 'page2-world', test:'page2' ,path: '/page2?text=world' },
// ];


// const prerenderCache = {};
// if (!dev) {
//   /**
//    * out 폴더에 있는 미리 렌더링된 HTML 파일을 읽어서 rperenderCache 에 저장한다.
//    * next export 명령어는 production 모드에서만 사용하므로
//    * out 폴더의 내용을 읽는 작업은 production 모드에서만 한다.
//    */
//   for (const info of prerenderList) {
//     const { name, path, test } = info;
//     console.log('name', name);
//     console.log('path', path);
//     console.log('test', test)
//     const html = fs.readFileSync(`./out/${test}.html`, 'utf8');
//     // console.log('html', html)
//     prerenderCache[path] = html;
//   }
// }


// async function renderAndCache(req, res) {
//   const parsedUrl = url.parse(req.url, true);
//   console.log('paresedUrl', parsedUrl);

//   // 쿼리 파라미터가 포함된 경로를 키로 사용한다.
//   const cacheKey = parsedUrl.path;
//   if (ssrCache.has(cacheKey)) {
//     console.log('캐시 사용');
//     res.send(ssrCache.get(cacheKey));
//     return;
//   }
//   if (prerenderCache.hasOwnProperty(cacheKey)) {
//     console.log('미리 렌더링한 HTML 사용');
//     res.send(prerenderCache[cacheKey]);
//     return;
//   }
//   try {
//     const { query, pathname } = parsedUrl;
//     const html = await app.renderToHTML(req, res, pathname, query); // renderToHtml 아님 대소문자 구별 주의
//     if (res.statusCode === 200) {
//       ssrCache.set(cacheKey, html);
//     }
//     res.send(html);
//   } catch (err) {
//     console.log('err', err);
//     app.renderError(err, req, res);
//   }
// }

// 실습2
const express = require('express');
const next = require('next');
const url = require('url');
const lruCache = require('lru-cache');

const ssrCache = new lruCache({
  max: 100,
  maxAge: 1000 * 60,
});

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/page/:id', (req, res) => {
    res.redirect(`/page${req.params.id}`);
  });
  server.get(/^\/page[1-9]/, (req, res) => {
    return renderAndCache(req, res);
  });
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

const fs = require('fs');

const prerenderList = [
  { name: 'page1', path: '/page1' },
  { name: 'page2-hello', path: '/page2?text=hello' },
  { name: 'page2-world', path: '/page2?text=world' },
];
const prerenderCache = {};
if (!dev) {
  for (const info of prerenderList) {
    const { name, path } = info;
    const html = fs.readFileSync(`./out/${name}.html`, 'utf8');
    prerenderCache[path] = html;
  }
}

async function renderAndCache(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const cacheKey = parsedUrl.path;
  if (ssrCache.has(cacheKey)) {
    console.log('캐시 사용');
    res.send(ssrCache.get(cacheKey));
    return;
  }
  if (prerenderCache.hasOwnProperty(cacheKey)) {
    console.log('미리 렌더링한 HTML 사용');
    res.send(prerenderCache[cacheKey]);
    return;
  }
  try {
    const { query, pathname } = parsedUrl;
    const html = await app.renderToHTML(req, res, pathname, query);
    if (res.statusCode === 200) {
      ssrCache.set(cacheKey, html);
    }
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, pathname, query);
  }
}