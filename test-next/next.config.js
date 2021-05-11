//8-58
module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /.(png|jpg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            // 쿼리 파라미터 부분에 해시를 추가해서 파일의 내용이 변경될 때마다 파일의 경로도 수정되도록 한다.
            name: '[path][name].[ext]?[hash]',
            // next 는 static 폴더의 정적 파일을 그대로 서비스하기 때문에 파일을 복사할 필요가 없다.
            emitFile: false,
            publicPath: '/',
          },
        },
      ],
    });
    return config;
  },
  exportPathMap: function () {
    return {
      '/page1': { page: '/page1' },
      '/page2-hello': { page: '/page2', query: { text: 'hello' } },
      '/page2-world': { page: '/page2', query: { text: 'world' } },
    };
    // 왜 /page2-hello.html 으로 접근해야만 가능한가?
  },
};
