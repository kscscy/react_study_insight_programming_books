// 8-34
import express from 'express';
import fs from 'fs';
import path from 'path';
import * as url from 'url';
import lruCache from 'lru-cache';
import { renderPage, prerenderPages } from './common';
import { ServerStyleSheet } from 'styled-components';
import React from 'react';
import App from './App';
import { renderToNodeStream } from 'react-dom/server';

const ssrCache = new lruCache({
  max: 100, // 최대 100개의 페이지를 캐싱
  maxAge: 1000 * 60, // 각 아이템은 60초 동안 캐싱되도록 설정
});

const html = fs
  .readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf8')
  .replace('__STYLE_FROM_SERVER__', '');

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
  const cacheKey = parsedUrl.path;
  if (ssrCache.has(cacheKey)) {
    // 캐시가 존재하면 캐싱된 값을 사용한다.
    console.log('캐시 사용');
    res.send(ssrCache.get(cacheKey));
    return;
  }
  const page = parsedUrl.pathname ? parsedUrl.pathname.substr(1) : 'home';

  const initialData = { page };
  const isPrerender = prerenderPages.includes(page);
  const result = (isPrerender ? prerenderHtml[page] : html).replace(
    'TEST_DATA',
    JSON.stringify(initialData)
  );

  if (isPrerender) {
    ssrCache.set(cacheKey, result);
    res.send(result);
  } else {
    // root 요소를 기준으로 이전 문자열과 이후 문자열로 나눈다.
    const ROOT_TEXT = '<div id="root">';
    const prefix = result.substr(
      0,
      result.indexOf(ROOT_TEXT) + ROOT_TEXT.length
    );
    const postfix = result.substr(prefix.length);
    // 이전 문자열은 바로 전송한다. write 메서드는 여러 번 호출할 수 있다.
    res.write(prefix);
    const sheet = new ServerStyleSheet();
    const reactElement = sheet.collectStyles(<App page={page} />);
    const renderStream = sheet.interleaveWithNodeStream(
      /**
       * renderToNodeStream 함수를 호출해서 읽기 가능한 스트림 객체를 만든다.
       * 스트림 방식을 사용할 때는 styled-components의 interleaveWithNodeStream 메서드를 호출해야 한다.
       * 이 메서드는 renderStream에서 스타일 코드가 생성되도록 하는 역할을 한다.
       * 기존에는 스타일 코드를 __STYLE_FROM_SERVER__ 부분에 삽입했지만 이제는 root 요소 내부에 삽입한다.
       */
      renderToNodeStream(reactElement)
    );
    /**
     * renderStream 스트림과 res 스트림을 연결한다.
     * res는 쓰기 가능한 스트림이다.
     * {end: false} 옵션은 스트림이 종료됐을 때 res.end 메서드가 자동으로 호출되지 않도록 한다.
     * 스트림이 종료되면 마지막으로 postfix 데이터를 전송한다.
     */
    renderStream.pipe(res, { end: false });
    renderStream.on('end', () => {
      res.end(postfix);
    });
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`sever listening at ${port}`);
});
