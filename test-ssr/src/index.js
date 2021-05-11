import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// 서버로부터 전달된 초기 데이터를 가져온다.
const initialData = window.__INITIAL_DATA__;
// const initHello = window.HELLO;
// console.log('initHello', initHello);
console.log('initialData', initialData);

ReactDOM.hydrate(
  <App page={initialData.page} />, 
  document.getElementById('root')
);