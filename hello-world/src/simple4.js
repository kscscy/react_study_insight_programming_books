function LikeButtion() {
  const [liked, setLiked] = React.useState(false);
  const text = liked ? '좋아요 취소' : '좋아요';
  return React.createElement(
    'button',
    { onClick: () => setLiked(!liked) },
    text
  );
}

function Container() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <LikeButtion />
      <div style={{ marginTop: 20 }}>
        <span>현재 카운트: </span>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)}>증가</button>
        <button onClick={() => setCount(count - 1)}>감소</button>
      </div>
    </div>
  );
}

const domContainer = document.querySelector('#react-root');
ReactDOM.render(React.createElement(Container), domContainer);

// npx babel --watch src --out-dir . --presets @babel/preset-react
// 이 명령어로 설치된 패키지를 이용해서 자바스크립트 파일을 변환해준다.
// src 폴더에 있는 모든 javascript 파일을 @babel/preset-react 프리셋을 이용해서 변환 후
// 현재 폴더에 같은 이름의 javascript 파일을 생성한다. 
// watch 모드로 실행하면 src 폴더의 javascript 파일을 수정할 때마다 자동으로 변환 후 저장한다.
// 터미널에 Successfully compiled 1 file with Babel(100ms). 기록 (에러 없을 시)