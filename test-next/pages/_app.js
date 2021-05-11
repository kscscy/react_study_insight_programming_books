/**
 * 모든 페이지에서 공통으로 필요한 기능은 pages/_app.js 파일에서 구현할 수 있다.
 * 페이지가 전환돼도 메뉴 UI 를 그대로 유지하고 싶다면 _app.js파일에서 구현하는 게 좋다.
 */
import Link from 'next/link';

// Component 속성값은 현재 렌더링하려는 페이지 컴포넌트이고, 
// pageProps 속성값은 해당 페이지의 getInitialProps함수가 반환한 값이다.
export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Link href='/page1'>
        <a>page1</a>
      </Link>
      <Link href='/page2'>
        <a>page2</a>
      </Link>
      <Component {...pageProps} />
    </div>
  );
}

/**
 * MyApp 컴포넌트는 페이지가 전환되는 경우에도 언마운트 되지 않는다.
 * 메뉴 UI 는 항상 유지돼야 하므로 _app.js 파일에서 메뉴 UI를 구현하는 것이 자연스럽다.
 * 
 */