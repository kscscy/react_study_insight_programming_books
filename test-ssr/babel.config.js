const presets = [
  '@babel/preset-react',
  // @babel/preset-env 는 주로 오래된 브라우저를 지원하기 위한 용도로 사용된다.
  // 오래된 노드 버전을 사용하는 게 아니라면 불필요하기 때문에 서버 측 바벨 설정에 포함하지 않는다.
  '@babel/preset-env',
];
const plugins = [];

module.exports = { presets, plugins };
