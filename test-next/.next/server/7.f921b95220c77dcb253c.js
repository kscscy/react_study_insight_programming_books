exports.ids = [7];
exports.modules = {

/***/ "t3/3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sayHello", function() { return sayHello; });
/**
 * next 는 기본적으로 페이지별로 번들 파일을 생성한다.
 * 동적 import 사용 시에는 해당 모듈의 코드는 별도의 파일로 분할되며,
 * 여러 페이지에서 공통으로 사용되는 모듈도 별도의 파일로 분할된다.
 */
function sayHello() {
  return 'hello!!';
}

/***/ })

};;