// import React from 'react'
import ReactDOM from 'react-dom'

function App() {
  return (
    <div>
      <h3>안녕, 웹팩 플러그인 예제</h3>
      <p>html-webpack-plugin 플러그인을 사용합니다.</p>
      <p>{`앱 버전은 ${APP_VERSION}입니다.`}</p>
      <p>{`10 * 10 = ${TEN * TEN}`}</p>
    </div>
  );
}

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<App />, $('#root')[0]);
