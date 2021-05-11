const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 서버 코드를 번들링할 때는 node_modules 폴더 밑에 있는 모듈까지 하나의 번들 파일로 만들 필요는 없다.
// 서버 코드는 언제든지 node_modules 폴더 밑에 있는 모듈을 가져와서 사용할 수 있기 때문이다.
// webpack-node-externals 모듈은 node_modules 폴더 밑에 있는 모듈을 번들 파일에서 제외시켜 주는 역할을 한다.
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function getConfig(isServer, name) {
  // isServer 에 따라 웹팩 설정을 반환해 주는 함수
  return {
    entry: {[name]: `./src/${name}`},
    output: {
      // 클라이언트는 브라우저의 캐싱 효과 때문에 chunkhash를 사용하지만 서버는 필요 없다.
      filename: isServer ? '[name].bundle.js' : '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
    },
    /**
     * target 속성에 node를 입력해서 웹팩에 서버 코드를 번들링하는 것이라고 알려 줄 수 있다.
     * 웹팩은 node 가 입력되면 노드에 특화된 번들링 과정을 거친다.
     * 대표적으로 fs, path 모듈과 같이 노드에 내장된 모듈을 번들 파일에 포함시키지 않는다.
     */
    target: isServer ? 'node' : 'web',
    // 서버 코드를 번들링할 때는 node_modules 폴더 밑에 있는 모듈을 번들 파일에 포함시키지 않도록 한다.
    externals: isServer ? [nodeExternals()] : [],
    node: {
      /**
       * 이 설정을 하지 않으면 코드에서 __dirname을 사용할 경우 절대 경로인 / 가 입력된다.
       * false 를 입력할 경우 일반적인 노드의 __dirname으로 동작한다.
       * 이 프로젝트에서는 server.js 파일에서 index.html 파일을 읽을 때 __dirname을 사용하기 때문에 이 설정이 필요하다.
       */
      __dirname: false,
    },
    optimization: isServer
      ? {
        // 서버 코드는 압축할 필요가 없다.
          splitChunks: false,
          minimize: false,
        }
      : undefined,
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(
                __dirname,
                isServer ? '.babelrc.server.js' : '.babelrc.client.js'
              ),
            },
          },
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              // file-loader 실행 시 한쪽에서만 파일을 복사해도 충분하다.
              emitFile: isServer ? false : true,
            },
          },
        },
      ],
    },
    plugins: isServer
      ? []
      : [
        // 두 플러그인은 모두 클라이언트 코드 번들링 시에만 실행하면 된다.
          // new CleanWebpackPlugin(),
          new HtmlWebpackPlugin({
            template: './template/index.html',
          }),
        ],
    mode: 'production',
  };
}

// 웹팩 설정 파일에서 배열을 내보내면 배열의 각 아이템 개수만큼 웹팩이 실행된다.
// 여기서는 클라이언트 코드가 먼저 번들링되고 서버 코드가 그다음에 번들링된다.
module.exports = [
  getConfig(false, 'index'),
  getConfig(true, 'server'),
  getConfig(true, 'prerender'),
];