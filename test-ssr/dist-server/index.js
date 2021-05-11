"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _App = _interopRequireDefault(require("./App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 서버로부터 전달된 초기 데이터를 가져온다.
const initialData = window.__INITIAL_DATA__;
const initHello = window.HELLO;
console.log('initHello', initHello);
console.log('initialData', initialData);

_reactDom.default.hydrate( /*#__PURE__*/_react.default.createElement(_App.default, {
  page: initialData.page
}), document.getElementById('root'));