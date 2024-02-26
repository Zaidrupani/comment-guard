import React, { useState } from 'react';
import Landing from './Landing';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import YouTubeAuth from '../components/Youtubeauth';
import GoogleAuth from '../components/Googleauth';
import '../Styles/Home.css';
import '../Styles/Root.css';
import { Height } from '@material-ui/icons';

const Home = ({isUser, setUser}) => {
  const [youtubeData, setYoutubeData] = useState(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (tokenResponse) => {
    setUser(true);
  };

  const handleLoginError = (error) => {
    console.error('Google login failed:', error);
    if (error.error === 'popup_closed_by_user') {
      console.log('User closed the login popup.');
    } else {
      console.error('Other login error:', error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
  });

  return (
    <>
      <div className="homeBackground"></div>
      {isUser ? (
        <>
          <YouTubeAuth accessToken={login.accessToken} onYouTubeData={setYoutubeData} />
          <Landing youtubeData={youtubeData} />
        </>
      ) : (
        <div className="main" style={{height : '600px'}}>
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
          <GoogleAuth onLoginSuccess={handleLoginSuccess} onLoginError={handleLoginError} setUser={setUser}/>
        </div>
      )}
    </>
  );
};

export default Home;
