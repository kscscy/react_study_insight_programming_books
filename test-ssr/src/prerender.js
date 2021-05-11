// 데이터 의존성이 낮은 일부 페이지만 미리 렌더링하도록 리팩터링 해보자.
import fs from 'fs';
import path from 'path';
import { renderPage, prerenderPages } from './common';

for (const page of prerenderPages) {
  const result = renderPage(page);
  // 페이지를 미리 렌더링해서 dist 폴더 밑에 저장한다.
  fs.writeFileSync(path.resolve(__dirname, `../dist/${page}.html`), result);
}