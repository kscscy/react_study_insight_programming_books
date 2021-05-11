/**
 * 바벨은 컴파일 시 다음 세 단계를 거친다.
 * parse: 입력된 코드로부터 AST(abstract syntax tree)를 생성한다.
 * transform: AST를 원하는 형태로 변환한다.
 * generate: AST를 코드로 출력한다.
 * 
 * AST 는 코드의 구문(syntax)이 분석된 결과를 담고 있는 구조체다.
 * 코드가 같다면 AST도 같기 때문에 같은 코드에 대해서 하나의 AST를 만들어 놓고 재사용할 수 있다.
 */

// AST 를 이용해서 효율적으로 바벨을 실행하기
const babel = require('@babel/core');
const fs = require('fs');

const filename = './src/code.js';
const source = fs.readFileSync(filename, 'utf8');
const presets = ['@babel/preset-react'];

// 코드는 생성하지 않고 AST 만 생성한다.
const { ast } = babel.transformSync(source, {
  filename,
  ast: true, //
  code: false,
  presets,
  configFile: false,
});

// 설정의 플러그인이 반영된 코드를 생성한다.
// 설정의 개수가 많아질수록 이 방식의 효율은 높아진다.
const { code: code1 } = babel.transformFromAstSync(ast, source, {
  filename,
  plugins: ['@babel/plugin-transform-template-literals'],
  configFile: false,
});

const { code: code2 } = babel.transformFromAstSync(ast, source, {
  filename,
  plugins: ['@babel/plugin-transform-arrow-functions'],
  configFile: false,
});

console.log('code1:\n', code1);
console.log('code2:\n', code2);
