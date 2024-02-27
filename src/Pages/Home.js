import React, { useState, useEffect } from 'react';
import Landing from './Landing';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import YouTubeAuth from '../components/Youtubeauth';
import GoogleAuth from '../components/Googleauth';
import '../Styles/Home.css';
import '../Styles/Root.css';

const Home = ({ isUser, setUser }) => {
  const [youtubeData, setYoutubeData] = useState(null);
  const [loginInfo, setLoginInfo] = useState(null);
  const navigate = useNavigate();

  const onYouTubeData = (data) => {
    console.log('Received YouTube data:', data);
    setYoutubeData(data);
  };

  const handleLoginSuccess = (tokenResponse) => {
    console.log('Google login success');
    setUser(true);
    setLoginInfo(tokenResponse);
    fetchVideos(tokenResponse.accessToken);
  };
  

  const handleLoginError = (error) => {
    console.error('Google login failed:', error);
    if (error.error === 'popup_closed_by_user') {
      console.log('User closed the login popup.');
    } else {
      console.error('Other login error:', error);
    }
  };

  const fetchVideos = async (accessToken) => {
    try {
      const apiKey = 'AIzaSyA4PQzL7UVb3J97GoUOts_jECd3BU2K3bE'; // Replace with your actual YouTube Data API key
      console.log('Fetching channel details...');

      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&key=${apiKey}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        }
      );

      console.log('Channel request complete.');

      if (!channelResponse.ok) {
        throw new Error('Error fetching channel details');
      }

      const channelData = await channelResponse.json();
      const channelId = channelData.items[0].id;

      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=UU${channelId}&maxResults=10&key=${apiKey}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        }
      );

      if (!videosResponse.ok) {
        throw new Error('Error fetching videos');
      }

      const videosData = await videosResponse.json();
      onYouTubeData(videosData);
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
  });

  useEffect(() => {
    if (isUser && login?.accessToken) {
      console.log('Fetching videos...');
      fetchVideos(login.accessToken);
    }
  }, [isUser, login]);
  
  

  return (
    <>
      <div className="homeBackground"></div>
      {isUser ? (
        <>
          <YouTubeAuth accessToken={login.accessToken} onYouTubeData={onYouTubeData} />
          <Landing youtubeData={youtubeData} />
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
