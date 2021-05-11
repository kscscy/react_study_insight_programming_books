"use strict";

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var url = _interopRequireWildcard(require("url"));

var _server = require("react-dom/server");

var _styledComponents = require("styled-components");

var _react = _interopRequireDefault(require("react"));

var _App = _interopRequireDefault(require("./App"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 8-13
const app = (0, _express.default)();

const html = _fs.default.readFileSync(_path.default.resolve(__dirname, '../dist/index.html'), 'utf8');

app.use('/dist', _express.default.static('dist'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
  // 문자열로 된 주솟값을 구조체로 변환하기 위해 url 모듈을 사용한다.
  // parsedUrl 변수는 url의 경로와 쿼리파라미터 등의 정보를 담고 있다.
  const parsedUrl = url.parse(req.url, true); // pathname 앞 쪽 / 를 제거해서 page 변수를 만든다.

  const page = parsedUrl.pathname ? parsedUrl.pathname.substr(1) : 'home'; // 스타일을 추출하는 데 사용될 객체를 생성한다.

  const sheet = new _styledComponents.ServerStyleSheet(); // collectStyles 메서드에 리액트 요소를 입력하면 스타일 정보를 수집하기 위한 코드가 리액트 요소에 삽입된다.
  // 실제 스타일 정보는 renderToString 함수의 호출이 끝나야 수집할 수 있다.

  const renderString = (0, _server.renderToString)(sheet.collectStyles( /*#__PURE__*/_react.default.createElement(_App.default, {
    page: page
  })));
  const styles = sheet.getStyleTags();
  const initialData = {
    page
  };
  const testHello = {
    hello: 'world'
  };
  const result = html.replace( // 렌더링된 결과를 반영해서 HTML 을 완성한다.
  '<div id="root"></div>', `<div id="root">${renderString}</div>`).replace( // 주석 때문에? 아니면 __ 때문에? 왜 __DATA_FROM_SERVER__ 는 안되는?
  'TEST_DATA', JSON.stringify(initialData)).replace('HELLO_WORLD', JSON.stringify(testHello)).replace('__STYLE_FROM_SERVER__', styles);
  res.send(result);
});
const port = 3000;
app.listen(port, () => {
  console.log(`sever listening at ${port}`);
});