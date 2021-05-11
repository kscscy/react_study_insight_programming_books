// @babel/core 로 바벨을 직접 실행하기
const babel = require('@babel/core');
const fs = require('fs');

const filename = './src/code.js';
// 컴파일할 파일 내용 가져오기
const source = fs.readFileSync(filename, 'utf8');
// preset, plugin 설정
const presets = ['@babel/preset-react'];
const plugins = [
  '@babel/plugin-transform-template-literals',
  '@babel/plugin-transform-arrow-functions',
];
// transformSync 함수를 호출해서 바벨을 실행.
const { code } = babel.transformSync(source, {
  filename,
  presets,
  plugins,
  configFile: false, // babel 설정파일 사용하지 않도록
});
console.log(code);
