const config = require('./.babelrc.common.js');
// 서버에서 필요한 플러그인을 추가한다.
// @babel/plugin-transform-modules-commonjs 는 서버에서 실행하는 노드를 위해 필요하다.
config.plugins.push('@babel/plugin-transform-modules-commonjs');
module.exports = config;