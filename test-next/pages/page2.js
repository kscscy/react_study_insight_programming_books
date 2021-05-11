// 8-51, 52
import { callApi } from '../src/api';

Page2.getInitialProps = async ({ query }) => {
  /**
   * 브라우저에서 page2를 직접 접속하면 sayHello.js 모듈이 담긴 js 파일이 전송되지 않는다.
   * getInitialProps 함수가 서버 측에서 실행되어 클라이언트로 별도의 파일을 내려 줄 필요가 없기 때문이다.
   * page1에서 page2로 이동하는 버튼을 클릭하면 getInitialProps 함수가 클라이언트에서 실행된다.
   */
  const { sayHello } = await import('../src/sayHello');
  console.log('dynamic import', sayHello());
  const text = query.text || 'none';
  const data = await callApi();
  return { text, data };
};
export default function Page2({text, data}) {
  //function onClick() {
    // 동적 import 를 사용해서 sayHello 모듈을 가져온다.
    //import('../src/sayHello').then(({sayHello}) => console.log(sayHello()));
    /**
     * 버튼을 클릭하는 순간 sayHelloj.js 모듈이 담긴 js 파일이 전송되는 것을 확인할 수 있다.(최초 한 번)
     * .next/static/chunks 폴더 밑에 sayHello.js 모듈의 코드를 포함하는 번들 파일이 있다.
     * .next/server 폴더 밑에 sayHello.js 모듈의 코드를 포함하는 번들 파일이 있다.
     * 
     * 동적 import 를 사용하면 클라이언트뿐만 아니라 서버를 위한 번들 파일도 생성되는 것을 확인할 수 있다.
     * .next/server 폴더 밑에 생성되는 파일은 서버사이드 렌더링 시 사용된다.
     */
 // }
  return(
    <div>
      <p>This is home page2</p>
      <p>{`text: ${text}`}</p>
      <p>{`data is ${data}`}</p>
      {/* <button onClick={onClick}>sayHello</button> */}
    </div>
  );
}

