const path = require('path');
module.exports = {
  entry: './src/code.js', // 웹팩을 통해 번들링할 파일
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'code.bundle.js', // 번들링된 결과를 dis/code.bundle.js 파일로 저장
  },
  module: {
    /**
     * 자바스크립트 파일을 babel-loader 가 처리하도록 설정한다.
     * babel-loader 는 바벨의 설정 파일을 이용하므로 이전에 만들어놓은 babel.config.js 파일의 내용이 설정값으로 사용
     *  */
    rules: [{ test: /\.js$/, use: 'babel-loader' }],
  },
  // webpack은 기본적으로 자바스크립트 파일을 압축한다. 실행결과 확인을 위해 압축기능을 잠시 끈다.
  // 주석도 알아서 제거해준다?
  optimization: { minimizer: [] },
};
