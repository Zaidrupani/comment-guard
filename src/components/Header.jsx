import React from 'react';
import HomeHeader from './HomeHeader';
import '../Styles/Header.css';

const Header = ({isUser, setUser}) => {
  const home = window.location.pathname === '/';
  console.log(home);
  const handleLogout = () =>{
    localStorage.removeItem('accessToken');
    setUser(false);
  }
  console.log("isUser" + isUser);
  return (
    <>
      {(home && !isUser) ?
        <HomeHeader isUser={isUser}/>
        :
        <header style={headerStyle}>
          <div style={leftSide}>
          <a href="/">
            <h1 className='head'>COMMENT GUARD</h1>
          </a>
            <p className='phead'>Guarding against toxicity</p> {/* Tagline */}
          </div>
          <div style={rightSide}>
            <a href="/">HOME</a>
            <a href="/about-us">ABOUT US</a>
            <a href="/resources">RESOURCES</a>
            {isUser && <a href='/' onClick={handleLogout}>LOGOUT</a>}
          </div>
        </header>}
    </>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1em',
  background: 'white',
  color: '#fff',
  width: '100%',
};

const leftSide = {
  flex: 1,
  marginLeft: '60px',
  marginTop: '10px'

};

const rightSide = {
  display: 'flex',
  gap: '7em',
  marginRight: '60px'
};

export default Header;
