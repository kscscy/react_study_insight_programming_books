// react 프리셋을 이용해서 JSX 문법 변환
const element = <div>babel test</div>;
// 템플릿 리터럴 플러그인을 이용한 변환
const text = `element type is ${element.type}`;
// 화살표 함수 플러그인을 이용한 변환
const add = (a, b) => a + b;


// npx babel src/code.js --presets=@babel/preset-react --plugins=@babel/plugin-transform-template-literals,@babel/plugin-transform-arrow-functions
// ------babel cli 실행 결과------
// const element = /*#__PURE__*/ React.createElement('div', null, 'babel test');
// const text = 'element type is '.concat(element.type);

// const add = function (a, b) {
//   return a + b;
// };
// -----------------------------

// @babel/cli 로 설정값을 표현할 수 있지만, 설정할 내용이 많거나 실행 환경에 따라 설정값이 다른 경우에는 설정 파일을 따로 만들자.
// babel 6 까지는 .babelrc 파일로 관리
// babel 7 부터는 babel.config.js 로 관리