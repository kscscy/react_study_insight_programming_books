// 8-61 next 에서 styled-components 패키지를 사용할 수 있도록 설정하기
/**
 * next에서는 pages 폴더 밑에 _document.js 파일을 작성할 수 있도록 허용한다.
 * _document.js 파일을 생성하면 next는 내장된 _document.js 파일 대신 우리가 작성한 파일을 사용한다.
 */
import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// next의 Document 컴포넌트를 상속받아서 컴포넌트를 만든다.
export default class MyDocument extends Document {
  // next에 내장된 Document 컴포넌트의 getInitialProps 함수에서는 styled-jsx의 스타일 코드를 추출한다.
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          // MyDocument 컴포넌트의 getInitialProps 메서드는 styled-components 의 스타일 코드를 추출한다.
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles:(
          <>
            {initialProps.styles}
            {/** styled-components로 추출한 스타일 코드를 반환값에 추가한다. */}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
