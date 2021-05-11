const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // js 확장자를 갖는 모듈은 babel-loader 가 처리하도록 설정한다.
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // css 확장자를 갖는 모듈은 css-loader 가 처리하도록 설정, 그런데 css-loader 만으로는 돔 스타일이 적용되지 않는다.
      // 스타일을 실제로 적용하기 위해서는 style-loader 가 필요하다.
      {
        test: /\.css$/,
        // 로더를 배열로 입력하면 오른쪽부터 실행된다. css, style 순으로 입력할 경우 build 실패(css syntax error)
        // style, css 순으로 
        use: ['style-loader','css-loader',],
      },
      {
        test: /\.(png|jpg|gif)$/,
        // use: 'file-loader'
        use:[
          {
            // url-loader 는 파일 크기가 설정한 값보다 작은 경우에는 번들 파일에 파일의 내용을 포함시킨다.
            // >> 이 경우 이미지가 base64로 변환됨
            // 파일 크기가 이 값보다 큰 경우에는 다른 로더가 처리할 수 있도록 fallback 옵션을 제공한다. 
            // 옵션을 입력하지 않으면 기본적으로 file-loader가 처리한다.
            loader: 'url-loader',
            options: {
              limit:8192
            }
          }
        ],
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ],
  },
  mode: 'production',
};