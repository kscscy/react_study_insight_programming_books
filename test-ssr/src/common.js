import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './App';
import {ServerStyleSheet} from 'styled-components';

const html = fs.readFileSync(
  // dist/index.html 파일의 내용을 가져온다.
  path.resolve(__dirname, '../dist/index.html'),
  'utf8',
);

// 미리 렌더링할 페이지의 목록을 정의한다.
export const prerenderPages = ['home'];

export function renderPage(page) {
  const sheet = new ServerStyleSheet();
  const renderString = renderToString(sheet.collectStyles(<App page={page} />));
  const styles = sheet.getStyleTags();
  const result = html
    .replace('<div id="root"></div>', `<div id="root">${renderString}</div>`)
    .replace('__STYLE_FROM_SERVER__', styles);
    // DATA_FROM_SERVER 는 그대로 둔다.
    // renderPage 함수에서 데이터에 대한 정보를 모르기 때문이다.
  return result;
}