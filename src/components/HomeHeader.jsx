import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';

const HomeHeader = ({isUser}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () =>{
    localStorage.removeItem('accessToken');
  }

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isMenuOpen && !event.target.closest('.menu-links')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <header style={headerStyleHome}>
      <div style={leftSideHome}>
        <h1 className='head'>COMMENT GUARD</h1>
        <p className='phead'>Guarding against toxicity</p> {/* Tagline */}
      </div>
      <div style={rightSideHome}>
        <FaBars onClick={toggleMenu} className='hamburger-icon' />
        {isMenuOpen && (
          <div className='menu-links'>
            <a href="/">HOME</a>
            {/* <a href="/about-us">ABOUT US</a> */}
            <a href="/resources">RESOURCES</a>
            {isUser && <a href='/' onClick={handleLogout}>LOGOUT</a>}
          </div>
        )}
      </div>
    </header>
  );
};

const headerStyleHome = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1em',
  color: '#fff',
  width: '100%',
};

const leftSideHome = {
  flex: 1,
  marginLeft: '60px',
  marginTop: '10px',
};

const rightSideHome = {
  display: 'flex',
  gap: '1em', // Adjust as needed
  marginRight: '60px',
};

export default HomeHeader;
