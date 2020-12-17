function LikeButtion() {
  const [liked, setLiked] = React.useState(false);
  const text = liked ? '좋아요 취소' : '좋아요';
  return React.createElement('button', {
    onClick: () => setLiked(!liked)
  }, text);
}

function Container() {
  const [count, setCount] = React.useState(0);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(LikeButtion, null), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD604\uC7AC \uCE74\uC6B4\uD2B8: "), /*#__PURE__*/React.createElement("span", null, count), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCount(count + 1)
  }, "\uC99D\uAC00"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCount(count - 1)
  }, "\uAC10\uC18C")));
}

const domContainer = document.querySelector('#react-root');
ReactDOM.render(React.createElement(Container), domContainer); // npx babel --watch src --out-dir . --presets @babel/preset-react
// 이 명령어로 설치된 패키지를 이용해서 자바스크립트 파일을 변환해준다.
// src 폴더에 있는 모든 javascript 파일을 @babel/preset-react 프리셋을 이용해서 변환 후
// 현재 폴더에 같은 이름의 javascript 파일을 생성한다. 
// watch 모드로 실행하면 src 폴더의 javascript 파일을 수정할 때마다 자동으로 변환 후 저장한다.
// 터미널에 Successfully compiled 1 file with Babel(100ms). 기록 (에러 없을 시)