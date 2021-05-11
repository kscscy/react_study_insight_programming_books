// // 8-46
// import { callApi } from '../src/api';
// import Router from 'next/router';

// // Data fetching을 서버에서 미리 처리하도록 도와주는 것이 getInitialProps다.(Data fetching에만 사용하는 것은 아님)
// Page2.getInitialProps = async ({ query, pathname, asPath, req, res, err }) => {
//   // throw new Error('exception in Page2.getInitialProps');

//   // localhost:3000/page2?text=test
//   console.log('pathname', pathname); // /page2
//   console.log('asPath', asPath); // /page2?text=test
//   console.log('query', query);// {text: 'test'}
//   //console.log('req', req); // HTTP request object(server only)
//   //console.log('res', res) // HTTP response object(server only)
//   //console.log('err', err);

//   const text = query.text || 'none';
//   // getInitialProps 함수 내부의 API 호출은 서버 또는 클라이언트에서 호출될 수 있다는 점을 기억해야 한다.
//   const data = await callApi();
//   // getInitialProps 함수가 반환하는 값은 페이지 컴포넌트의 속성값으로 전달된다.
//   return { text, data };
// };
// // 한 페이지를 로드할 때, 하나의 getInitialProps 로직만 실행된다.

// // 페이지 컴포넌트에서 getInitialProps 함수가 반환한 값을 사용한다.
// export default function Page2({text, data}) {
//   return(
//     <div>
//       {/* <button onClick={() => Router.push('/page1')}>page1로 이동</button> */}
//       <p>This is home page2</p>
//       <p>{`text: ${text}`}</p>
//       <p>{`data is ${data}`}</p>
//     </div>
//   );
// }
