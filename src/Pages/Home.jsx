import React, { useState, useEffect } from 'react';
import Landing from './Landing';
import GoogleAuth from '../components/Googleauth';
import { handleYouTubeAuthorization } from '../components/Youtubeauth';
import '../Styles/Home.css';
import '../Styles/Root.css';

const Home = ({ isUser, setUser }) => {
  const [landingData, setLandingData] = useState(null);

  const handleLoginSuccess = async (tokenResponse) => {
    try {
      console.log('Google login success');
      setUser(true);
    } catch (error) {
      console.error('Error handling login success:', error);
    }
  };

  const handleLoginError = (error) => {
    console.error('Google login failed:', error);
    if (error.error === 'popup_closed_by_user') {
      console.log('User closed the login popup.');
    } else {
      console.error('Other login error:', error);
    }
  };

  return (
    <>
      <div className="homeBackground"></div>
      {isUser ? (
        <>
        <Landing youtubeData={landingData} />
        </>
      ) : (
        <div className="main" style={{ height: '600px' }}>
          <p className="hello">
            {' '}
            Hello, <br /> <span className="welcome">Welcome!</span>
          </p>

          <div className="container">
            <p className="pbody">
              {' '}
              YouTube comments got you down? Don't suffer in silence! Our website analyzes video comments, reveals the hate score, and empowers you to take control. Protect your online experience, promote positivity, and enjoy YouTube, worry-free! ✨
            </p>
          </div>
          <br />
          <GoogleAuth onLoginSuccess={handleLoginSuccess} onLoginError={handleLoginError} setUser={setUser} />
        </div>
      )}
    </>
  );
};

export default Home;
