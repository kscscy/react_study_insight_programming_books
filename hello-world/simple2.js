function LikeButtion() {
  const [liked, setLiked] = React.useState(false);
  const text = liked ? '좋아요 취소' : '좋아요';
  return React.createElement(
    'button',
    { onClick: () => setLiked(!liked) },
    text,
  );
}

// 상태가 각각 적용된다?
ReactDOM.render(
  React.createElement(LikeButtion),
  document.querySelector('#react-root1'),
);
ReactDOM.render(
  React.createElement(LikeButtion),
  document.querySelector('#react-root2')
);
ReactDOM.render(
  React.createElement(LikeButtion),
  document.querySelector('#react-root3')
);

