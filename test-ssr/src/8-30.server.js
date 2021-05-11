// 8-30
import express from 'express';
import fs from 'fs';
import path from 'path';
import * as url from 'url';
import lruCache from 'lru-cache';
import { renderPage, prerenderPages } from './common';

const ssrCache = new lruCache({
  max: 100, // 최대 100개의 페이지를 캐싱
  maxAge: 1000 * 60 // 각 아이템은 60초 동안 캐싱되도록 설정
});

const app = express();
const prerenderHtml = {};
for (const page of prerenderPages) {
  const pageHtml = fs.readFileSync(
    path.resolve(__dirname, `../dist/${page}.html`),
    'utf8'
  );
  prerenderHtml[page] = pageHtml;
}

app.use('/dist', express.static('dist'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  /**
   * cacheKey는 쿼리 파라미터를 포함하는 url로 한다.
   * 만약 페이지를 렌더링할 때 user-agent와 같은 추가 정보를 이용한다면,
   * cacheKey는 그 정보들을 모두 포함해야 한다.
   */
  const cacheKey= parsedUrl.path;
  if (ssrCache.has(cacheKey)) {
    // 캐시가 존재하면 캐싱된 값을 사용한다.
    console.log('캐시 사용');
    res.send(ssrCache.get(cacheKey));
    return;
  }
  const page = parsedUrl.pathname ? parsedUrl.pathname.substr(1) : 'home';
  
  const initialData = { page };
  const pageHtml = prerenderPages.includes(page)
    ? prerenderHtml[page]
    : renderPage(page);

  const result = pageHtml.replace(
    'TEST_DATA',
    JSON.stringify(initialData),
  );
  // 캐시가 존재하지 않으면 서버사이드 렌더링 후 그 결과를 캐시에 저장한다.
  ssrCache.set(cacheKey, result);
  res.send(result);
});

const port = 3000;

app.listen(port, () => {
  console.log(`sever listening at ${port}`);
});
