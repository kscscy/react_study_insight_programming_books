const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    // 각 페이지의 자바스크립트 파일을 entry로
    page1: './src/index1.js',
    // page2: './src/index2.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    // splitChunks 속성을 이용하면 코드를 분할할 수 있다.
    splitChunks: {
      // chunks 속성의 기본값은 동적 improt 만 분할하는 async다.
      // 여기서는 동적 import 가 아니더라도 코드가 분할되도록 all 로 설정한다.
      chunks: 'all',
      // minSize: 10, // 파일 크기 제한에 걸리지 않도록 낮은 값을 설정한다.
      cacheGroups: {
        // vendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   priority: 2,
        //   name: 'venders',
        // },
        defaultVendors: {
          // minChunks: 1, // 청크 개수 제한을 최소 한 개로 설정한다.
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 1,
        },
        // 리액트 패키지 별도로 분리하기
        reactBundle: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react.bundle',
          priority: 2, // 이 그룹의 우선순위가 높아야 리액트 모듈이 vendors 그룹에 들어가지 않는다.
          minSize: 100
        }
      },
      // 이 상태로 웹팩을 빌드하면 lodash, react 모듈은 vendor.js 파일로 만들어진다.
      name: 'vendor',
    },
  },
  // dist 폴더를 정리하기 위해 clean-webpack-plugin을
  plugins: [new CleanWebpackPlugin()],
  mode: 'production',
};
