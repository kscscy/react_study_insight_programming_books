const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    page3: './src/index3.js',
  },
  output: {
    filename: '[name].js',
    // chunkFilename 속성을 이용하여 동적 import 로 만들어지는 번들 파일의 이름을 설정한다.
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new CleanWebpackPlugin()],
  mode: 'production',
};
