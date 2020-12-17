function LikeButtion() {
  const [liked, setLiked] = React.useState(false);
  const text = liked ? '좋아요 취소' : '좋아요';
  return React.createElement(
    'button',
    { onClick: () => setLiked(!liked) },
    text,
  );
}
const domContainer = document.querySelector('#react-root');
ReactDOM.render(React.createElement(LikeButtion), domContainer);

// React.createElement(components, props, ...children) => ReactElement
// component 는 문자열이나 리액트 컴포넌트 (문자열이면 HTML 태그에 해당하는 돔 요소 생성)
// props 는 컴포넌트가 사용하는 데이터 (style, className 등)
// children 은 해당 컴포넌트가 감싸고 있는 내부 컴포넌트
/**
 * -일반적인 html 코드-
 * <div>
 *  <p>hello</p>
 *  <p>world</p>
 * </div>
 * 
 * -createElement 함수-
 * createElement(
 *  'div',
 *  null,
 *  createElement('p', null, 'hello'),
 *  createElement('p', null, 'world'),
 * )
 */