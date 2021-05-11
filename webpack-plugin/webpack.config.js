const path = require('path');
const webpack = require('webpack');

// 웹팩을 실행해서 나오는 결과물을 확인하기 위해서는 이전처럼 HTML 파일을 수동으로 작성해야 한다.
// 여기서는 번들 파일 이름에 chunkhash 옵션을 설정했기 떄문에 파일의 내용이 변경될 때마다 HTML 파일의 내용도 수정해야 한다.
// 이 작업을 자동으로 하는 플러그인이 html-webpack-plugin 이다.
const HtmlWebpackPlugin = require('html-webpack-plugin');
// clean-webpack-plugin은 웹팩을 실행할 때마다 dist 폴더를 정리한다.
// 여기서는 번들 파일의 내용이 변경될 때마다 파일 이름도 변경되기 때문에 이전에 생성된 번들 파일을 정리하는 용도로 사용한다.
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    // chunkhash 를 사용하면 파일의 내용이 수정될 때마다 파일 이름이 변경되도록 할 수 있다.
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          // babel.config.js 파일로 바벨을 설정할 수도 있지만 babel-loader 에서 직접 설정할 수도 있다.
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // index.html 파일이 자동으로 생성되도록 html-webpack-plugin 을 설정한다.
      // 이때 원하는 형태를 기반으로 index.html 파일이 생성되도록 template 옵션을 설정한다.
      template: './template/index.html',
    }),
    new webpack.DefinePlugin({
      // DefinePlugin은 웹팩 모듈에 포함돼 있다.
      APP_VERSION:'"1,2,3"',
      TEN: '10'
    }),
    new webpack.ProvidePlugin({
      // ProvidePlugin 을 사용하면 미리 설정한 모듈을 자동으로 등록해 준다.
      // 이 플러그인은 웹팩에 기본으로 포함돼 있기 때문에 별도로 설치할 필요는 없다.
      //
      React: 'react',
      $: 'jquery',
    })
  ],
  mode: 'production',
};
