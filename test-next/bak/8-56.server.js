// 8-56
/**
 * 지금까지는 next 에 내장된 웹 서버를 사용했다.
 * 내장된 웹 서버를 사용하지 않고 웹 서버를 직접 띄우면 좀 더 많은 일을 할 수 있다.
 * 예를 들어, 내장된 웹 서버는 서버사이드 렌더링 결과를 캐싱할 수 없지만
 * 직접 띄운 웹 서버에서는 캐싱을 통해 보다 많은 트래픽을 처리할 수 있다.
 */
const express = require('express');
const next = require('next');
const url = require('url');
// 서버사이드 렌더링 결과를 캐싱하기 위해 lru-cache 패키지를 이용한다.
const lruCache = require('lru-cache');

const ssrCache = new lruCache({
  // 최대 100개의 항목을 저장하고 각 항목은 60초 동안 저장한다.
  max: 100,
  maxAge: 1000 * 60,
});

const port = 3000;
// 1. NODE_ENV 환경 변수에 따라 개발 모드와 프로덕션 모드를 구분한다.
const dev = process.env.NODE_ENV !== 'production';
// 2. next 를 실행하기 위해 필요한 객체와 함수를 생성한다.
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // 3. next의 준비과정이 끝나면 입력된 함수를 실행한다.
  const server = express();

  server.get(/^\/page[1-9]/, (req, res) => {
    // /page1, /page2 요청에 대해 서버사이드 렌더링 결과를 캐싱한다.
    return renderAndCache(req, res);
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

async function renderAndCache(req, res) {
  const parsedUrl = url.parse(req.url, true);
  console.log('paresedUrl', parsedUrl);

  // 쿼리 파라미터가 포함된 경로를 키로 사용한다.
  const cacheKey = parsedUrl.path;
  if (ssrCache.has(cacheKey)) {
    console.log('캐시 사용');
    res.send(ssrCache.get(cacheKey));
    return;
  }
  try {
    const { query, pathname } = parsedUrl;
    // 캐시가 없으면 next의 renderToHtml 메서드를 호출하고,
    // async-await 을 사용해서 처리가 끝날 때까지 기다린다.
    console.log('query?', query, pathname);
    const html = await app.renderToHTML(req, res, pathname, query); // renderToHtml 아님 대소문자 구별 주의
    if (res.statusCode === 200) {
      // renderToHTML 함수가 정상적으로 처리됐으면 그 결과를 캐싱한다.
      ssrCache.set(cacheKey, html);
    }
    res.send(html);
  } catch (err) {
    console.log('err', err);
    app.renderError(err, req, res);
  }
}
