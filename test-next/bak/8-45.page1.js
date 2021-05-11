//8-45
import Head from 'next/head';
import Icon from '../static/icon.png';
import Link from 'next/link';

function Page1() {
  return (
    <div>
      <div>
        {/**Link 컴포넌트를 이용해서 page2로 이동 버튼을 만든다
         * Link 컴포넌트의 자식 요소를 클릭하면 href 속성으로 전달된 페이지로 이동한다.
         */}
        {/* <Link href="/page2">
          <a>page2로 이동</a>
        </Link> */}
      </div>
      <p>This is home page</p>
      {/** 
       * 프로젝트 루트의 static 폴더 밑에 정적 파일을 만들고 이처럼 경로를 입력하면 정적 파일을 서비스할 수 있다.
       * 단, 이 방식은 파일의 내용과 상관없이 항상 같은 경로가 사용되므로 브라우저 캐싱에 불리한 단점이 있다.
       */}

      {/* <img src='/static/icon.png' /> */}
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
      <style jsx>{`
        p {
          color: blue;
          font-size: 18pt;
        }
      `}</style>
    </div>
  );
}

export default Page1;
