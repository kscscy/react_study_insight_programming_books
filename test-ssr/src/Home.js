import React from 'react'

function Home({ username }) {
  /**
   * 사용자 이름이 서버사이드 렌더링 시 존재하면 home 페이지는 사용자마다 다르기 때문에 미리 렌더링 할 수 없다.
   * 따라서 서버사이드 렌더링 시에는 사용자 이름 없이 렌더링하고, 
   * 클라이언트에서는 마운트 이후에 사용자 이름을 API로 받아 오도록 하자.
   */

  return (
    <div>
      <h3>This is home page.</h3>
      {/** property 값으로 받아온 사용자 이름이 존재하면 화면에 보여준다. */}
      {username && <p>{`${username} 님 안녕하세요!`}</p>}
    </div>
  );
}

export default Home;