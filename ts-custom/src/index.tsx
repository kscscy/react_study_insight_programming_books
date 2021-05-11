import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';

console.log('aaa'.padStart(5, '0'));

ReactDOM.render(<App name="1" age={2} />, document.getElementById('root'));