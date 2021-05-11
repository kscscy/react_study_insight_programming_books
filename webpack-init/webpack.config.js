const path = require('path');

module.exports = {
  entry: './src/index.js', // index.js 모듈을 입력 파일로 사용한다.
  output: {
    filename: 'main.js', // dist 폴더 밑에 main.js 번들 파일을 생성한다.
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'none', // production 모드로 설정하면 js 코드 압축을 포함한 여러 가지 최적화 기능이 기본으로 들어간다.(devlopment/production/none)
  optimization: { minimizer: [] }, // 번들 파일의 내용을 쉽게 확인하기 위해 압축하지 않도록 설정한다.
};
