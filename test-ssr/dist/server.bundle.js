/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 341:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(297));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function About() {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", null, "This is about page."));
}

var _default = About;
exports.default = _default;

/***/ }),

/***/ 255:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = App;

var _react = _interopRequireWildcard(__webpack_require__(297));

var _styledComponents = _interopRequireDefault(__webpack_require__(914));

var _Home = _interopRequireDefault(__webpack_require__(33));

var _About = _interopRequireDefault(__webpack_require__(341));

var _icon = _interopRequireDefault(__webpack_require__(103));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Container = _styledComponents.default.div`
  background-color: #aaaaaa;
  border: 1px solid blue;
`;

function fetchUserName() {
  const usernames = ['kim', 'kang', 'lee'];
  return new Promise(resolve => {
    const username = usernames[Math.floor(Math.random() * 3)];
    setTimeout(() => resolve(username), 100);
  });
}

function App({
  page
}) {
  const [page2, setPage2] = (0, _react.useState)(page);
  const [username, setUsername] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    window.onpopstate = event => {
      setPage(event.state);
    };
  }, []);
  (0, _react.useEffect)(() => {
    fetchUserName().then(data => setUsername(data));
  }, []);

  function onChangePage(e) {
    const newPage = e.target.dataset.page;
    window.history.pushState(newPage, '', `/${newPage}`);
    setPage2(newPage);
  }

  const PageComponent = page2 === 'home' ? _Home.default : _About.default;
  const tempStyle = {
    border: "1px solid blue"
  };
  return /*#__PURE__*/_react.default.createElement(Container, null, /*#__PURE__*/_react.default.createElement("button", {
    "data-page": "home",
    onClick: onChangePage
  }, "Home"), /*#__PURE__*/_react.default.createElement("button", {
    "data-page": "about",
    onClick: onChangePage
  }, "About"), /*#__PURE__*/_react.default.createElement(PageComponent, {
    username: username
  }), /*#__PURE__*/_react.default.createElement("img", {
    src: _icon.default
  }));
}

/***/ }),

/***/ 33:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(297));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Home({
  username
}) {
  /**
   * 사용자 이름이 서버사이드 렌더링 시 존재하면 home 페이지는 사용자마다 다르기 때문에 미리 렌더링 할 수 없다.
   * 따라서 서버사이드 렌더링 시에는 사용자 이름 없이 렌더링하고, 
   * 클라이언트에서는 마운트 이후에 사용자 이름을 API로 받아 오도록 하자.
   */
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", null, "This is home page."), username && /*#__PURE__*/_react.default.createElement("p", null, `${username} 님 안녕하세요!`));
}

var _default = Home;
exports.default = _default;

/***/ }),

/***/ 407:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.renderPage = renderPage;
exports.prerenderPages = void 0;

var _fs = _interopRequireDefault(__webpack_require__(747));

var _path = _interopRequireDefault(__webpack_require__(622));

var _server = __webpack_require__(250);

var _react = _interopRequireDefault(__webpack_require__(297));

var _App = _interopRequireDefault(__webpack_require__(255));

var _styledComponents = __webpack_require__(914);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const html = _fs.default.readFileSync( // dist/index.html 파일의 내용을 가져온다.
_path.default.resolve(__dirname, '../dist/index.html'), 'utf8'); // 미리 렌더링할 페이지의 목록을 정의한다.


const prerenderPages = ['home'];
exports.prerenderPages = prerenderPages;

function renderPage(page) {
  const sheet = new _styledComponents.ServerStyleSheet();
  const renderString = (0, _server.renderToString)(sheet.collectStyles( /*#__PURE__*/_react.default.createElement(_App.default, {
    page: page
  })));
  const styles = sheet.getStyleTags();
  const result = html.replace('<div id="root"></div>', `<div id="root">${renderString}</div>`).replace('__STYLE_FROM_SERVER__', styles); // DATA_FROM_SERVER 는 그대로 둔다.
  // renderPage 함수에서 데이터에 대한 정보를 모르기 때문이다.

  return result;
}

/***/ }),

/***/ 103:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "00dee33faf66909e7accc008cb569033.png");

/***/ }),

/***/ 127:
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ 747:
/***/ ((module) => {

module.exports = require("fs");;

/***/ }),

/***/ 8:
/***/ ((module) => {

module.exports = require("lru-cache");;

/***/ }),

/***/ 622:
/***/ ((module) => {

module.exports = require("path");;

/***/ }),

/***/ 297:
/***/ ((module) => {

module.exports = require("react");;

/***/ }),

/***/ 250:
/***/ ((module) => {

module.exports = require("react-dom/server");;

/***/ }),

/***/ 413:
/***/ ((module) => {

module.exports = require("stream");;

/***/ }),

/***/ 914:
/***/ ((module) => {

module.exports = require("styled-components");;

/***/ }),

/***/ 835:
/***/ ((module) => {

module.exports = require("url");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/dist/";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {


var _express = _interopRequireDefault(__webpack_require__(127));

var _fs = _interopRequireDefault(__webpack_require__(747));

var _path = _interopRequireDefault(__webpack_require__(622));

var url = _interopRequireWildcard(__webpack_require__(835));

var _lruCache = _interopRequireDefault(__webpack_require__(8));

var _common = __webpack_require__(407);

var _styledComponents = __webpack_require__(914);

var _react = _interopRequireDefault(__webpack_require__(297));

var _App = _interopRequireDefault(__webpack_require__(255));

var _server = __webpack_require__(250);

var _stream = __webpack_require__(413);

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 8-35
// 중간에 삽입할 스트림을 생성해 주는 함수
function createCacheStream(cacheKey, prefix, postfix) {
  // 스트림으로 전달된 모든 청크 데이터를 저장하는 배열
  const chunks = []; // Transform객체 생성. Transform은 읽기와 쓰기가 모두 가능한 스트림 객체다

  return new _stream.Transform({
    transform(data, _, callback) {
      // chunk 데이터를 받으면 호출되는 함수다.
      // 전달받은 청크 데이터를 그대로 chunks 배열에 넣는다.
      chunks.push(data);
      callback(null, data);
    },

    flush(callback) {
      /**
       * 청크 데이터가 모두 전달된 후 호출되는 함수다. 
       * 모든 청크 데이터와 prefix, postfix를 이용해서 하나의 완성된 HTML 데이터를 만들고 캐싱한다.
       */
      const data = [prefix, Buffer.concat(chunks).toString(), postfix];
      ssrCache.set(cacheKey, data.join(''));
      callback();
    }

  });
}

const ssrCache = new _lruCache.default({
  max: 100,
  // 최대 100개의 페이지를 캐싱
  maxAge: 1000 * 60 // 각 아이템은 60초 동안 캐싱되도록 설정

});

const html = _fs.default.readFileSync(_path.default.resolve(__dirname, '../dist/index.html'), 'utf8').replace('__STYLE_FROM_SERVER__', '');

const app = (0, _express.default)();
const prerenderHtml = {};

for (const page of _common.prerenderPages) {
  const pageHtml = _fs.default.readFileSync(_path.default.resolve(__dirname, `../dist/${page}.html`), 'utf8');

  prerenderHtml[page] = pageHtml;
}

app.use('/dist', _express.default.static('dist'));
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
  const initialData = {
    page
  };

  const isPrerender = _common.prerenderPages.includes(page);

  const result = (isPrerender ? prerenderHtml[page] : html).replace('TEST_DATA', JSON.stringify(initialData));

  if (isPrerender) {
    ssrCache.set(cacheKey, result);
    res.send(result);
  } else {
    // root 요소를 기준으로 이전 문자열과 이후 문자열로 나눈다.
    const ROOT_TEXT = '<div id="root">';
    const prefix = result.substr(0, result.indexOf(ROOT_TEXT) + ROOT_TEXT.length);
    const postfix = result.substr(prefix.length); // 이전 문자열은 바로 전송한다. write 메서드는 여러 번 호출할 수 있다.

    res.write(prefix);
    const sheet = new _styledComponents.ServerStyleSheet();
    const reactElement = sheet.collectStyles( /*#__PURE__*/_react.default.createElement(_App.default, {
      page: page
    }));
    const renderStream = sheet.interleaveWithNodeStream(
    /**
     * renderToNodeStream 함수를 호출해서 읽기 가능한 스트림 객체를 만든다.
     * 스트림 방식을 사용할 때는 styled-components의 interleaveWithNodeStream 메서드를 호출해야 한다.
     * 이 메서드는 renderStream에서 스타일 코드가 생성되도록 하는 역할을 한다.
     * 기존에는 스타일 코드를 __STYLE_FROM_SERVER__ 부분에 삽입했지만 이제는 root 요소 내부에 삽입한다.
     */
    (0, _server.renderToNodeStream)(reactElement)); // 우리가 생성한 스트림을 두 스트림 사이에 연결한다. 
    // 청크 데이터는 다음 순서로 흐른다. renderStream => cacheStream => res

    const cacheStream = createCacheStream(cacheKey, prefix, postfix);
    cacheStream.pipe(res);
    renderStream.pipe(cacheStream, {
      end: false
    });
  }
});
const port = 3000;
app.listen(port, () => {
  console.log(`sever listening at ${port}`);
});
})();

/******/ })()
;