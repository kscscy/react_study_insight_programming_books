const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src', 'index'),
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath 설정은 html-webpack-plugin 이 HTML 생성 시 HTMl 내부 리소스 파일의 경로를 만들 때 사용한다.
    // publicPath 설정 없이 생성된 HTML 파일은 브라우저에서 바로 실행하면 문제가 없지만 서버사이드 렌더링 할 때는 문제가 된다.
    // 이전에 server.js 파일에서 url 이 /dist 로 시작하는 경우에만 dist 폴더에 있는 파일을 서비스하도록 설정했기 때문에 publicPath도 같게 설정한다.
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // use: 'babel-loader',
        use: {
          loader: 'babel-loader',
          options: {
            // webpack은 클라이언트 코드에 대해서만 실행할 예정이다.
            // 따라서 babel-loader 가 클라이언트 설정으로 실행하도록 한다.
            configFile: path.resolve(__dirname, '.babelrc.client.js'),
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
};
