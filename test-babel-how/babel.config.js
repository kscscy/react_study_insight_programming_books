const presets = ['@babel/preset-react'];
const plugins = [
  '@babel/plugin-transform-template-literals',
  '@babel/plugin-transform-arrow-functions',
];

module.exports = { presets, plugins };

// 이제 npx babel src/code.js 로 간소화 가능

// 왜 module.exports 를 사용할까?
