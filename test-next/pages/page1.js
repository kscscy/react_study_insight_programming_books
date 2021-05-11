//8-45
import Head from 'next/head';
import Icon from '../static/icon.png';
import {add} from '../src/util';
import styled from 'styled-components';

const MyP = styled.div`
  color: blue;
  font-size: 18pt;
`;

function Page1() {
  return (
    <div>
      <MyP>{`10 + 20 = ${add(10, 20)}`}</MyP>
      <MyP>This is home page</MyP>
      <img src={Icon} />

      {/**
       * next 에서 제공하는 Head 컴포넌트를 사용하면 HTML head 태그에 원하는 돔 요소를 삽입할 수 있다.
       * 여러 번 사용하는 것도 가능하며 나중에 하나로 합쳐진다.
       */}
      <Head>
        <title>page1</title>
      </Head>
      <Head>
        <meta name='description' content='hello next' />
      </Head>
      {/**
       * next는 styled-jsx 패키지를 통해서 css-in-js방식을 지원한다.
       * 여기서 선언된 스타일은 이 컴포넌트 내부에 존재하는 엘리먼트에만 적용된다.
       * styled-jsx를 사용하지 않고 styled-components와 같은 다른 패키지를 사용하는 것도 가능하다.
       */}
      {/* <style jsx>{`
        p {
          color: blue;
          font-size: 18pt;
        }
      `}</style> */}
    </div>
  );
}

export default Page1;
