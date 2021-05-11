// 에러 페이지도 getInitialProps 함수를 사용할 수 있다.
ErrorPage.getInitialProps = ({ res, err }) => {
  // 에러 코드를 페이지 컴포넌트의 속성값으로 전달한다.
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default function ErrorPage({ statusCode }) {
  return (
    <div>
      {/** statusCode 변수의 값에 따라 다른 에러 메시지를 출력한다.
       * 만약 statusCode 변수의 값이 존재하지 않으면 클라이언트에서 발생한 에러다.
       */}
      {statusCode === 404 && '페이지를 찾을 수 없습니다.'}
      {statusCode === 500 && '알 수 없는 에러가 발생했습니다.'}
      {!statusCode && '클라이언트에서 에러가 발생했습니다.'}
    </div>
  );
}
