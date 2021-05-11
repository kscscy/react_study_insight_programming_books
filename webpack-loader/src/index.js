import React from 'react'
import ReactDOM from 'react-dom'

import Style from './App.css'
console.log({Style});

// json 모듈은 웹팩에서 기본적으로 처리해주기 때문에 별도의 로더를 설치하지 않아도 된다.
// TXT 모듈과 PNG 모듈을 처리하기 위해서는 file-loader raw-loader 필요
import Icon from './icon.png';
import Json from './data.json';
import Text from './data.txt';

function App() {
  return (
    <div className="container">
      <h3 className="title">webpack example</h3>
      <div>{`name:${Json.name}, age: ${Json.age}`}</div>
      <div>{`text: ${Text}`}</div>
      <img src={Icon} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));