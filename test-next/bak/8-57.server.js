// 8-57 단순히 정적 파일을 서비스하도록
// npx next export 명령어를 이용하면 전체 페이지를 미리 렌더링 할 수 있다.
// npx next build && npx next export (빌드 후에 실행해야 함)
const express = require('express');

const server = express();

server.use(express.static('out'));
// localhost:3000/page1.html 로 접근 가능
/**
 * localhost:3000/page2.html 로 접근 가능
 * 그러나 쿼리 파라미터는 적용되지 않는다. 미리 렌더링된 정적 파일이기 때문에 당연한 결과
 * next 에서는 쿼리 파라미터도 미리 설정할 수 있는 옵션을 제공해준다.
 * 
 */


server.listen(3000, (err) => {
  if (err) throw err;
});
