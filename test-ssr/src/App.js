import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Home from './Home';
import About from './About';
import Icon from './icon.png';

const Container = styled.div`
  background-color: #aaaaaa;
  border: 1px solid blue;
`;

function fetchUserName() {
  const usernames = ['kim', 'kang', 'lee'];
  return new Promise(resolve => {
    const username = usernames[Math.floor(Math.random() * 3)];
    setTimeout(() => resolve(username), 100);
  })
}

export default function App({ page }) {
  const [page2, setPage2] = useState(page);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    window.onpopstate = (event) => {
      setPage(event.state);
    };
  }, []);

  useEffect(() => {
    fetchUserName().then(data => setUsername(data));
  }, [])

  function onChangePage(e) {
    const newPage = e.target.dataset.page;
    window.history.pushState(newPage, '', `/${newPage}`);
    setPage2(newPage);
  }

  const PageComponent = page2 === 'home' ? Home : About;

  const tempStyle = {
    border: "1px solid blue"
  }
  return (
    <Container>
      <button data-page='home' onClick={onChangePage}>
        Home
      </button>
      <button data-page='about' onClick={onChangePage}>
        About
      </button>
      <PageComponent username={username}/>
      <img src={Icon} />
    </Container>
  );
}
