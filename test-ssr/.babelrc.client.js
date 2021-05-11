// 클라이언트와 서버에서는 common.js 의 설정을 가져와서 사용한다.
const config = require('./.babelrc.common.js');
// 클라이언트에서 필ㄷ요한 프리셋을 추가한다.
config.presets.push('@babel/preset-env');
module.exports = config;