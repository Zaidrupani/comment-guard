// GoogleAuth.jsx
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { handleYouTubeAuthorization } from './Youtubeauth'; // Import YouTube-related logic

const GoogleAuth = ({ setUser, onLoginSuccess, onLoginError }) => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
    onSuccess: async (tokenResponse) => {
      console.log('Google login successful:', tokenResponse);
      localStorage.setItem('accessToken', tokenResponse.access_token);
      setUser(tokenResponse.access_token);
  

      // Additional logic for YouTube authorization
      try {
        await handleYouTubeAuthorization(tokenResponse.access_token);
        navigate('/');
      } catch (error) {
        console.error('YouTube authorization failed:', error);
      }

      onLoginSuccess();
    },
    onError: (error) => {
      console.error('Google login failed:', error);
      onLoginError(error);
    },
  });

  return (
    <button className="login" onClick={login}>
      <img src="Images/G Logo.png" className="google-logo" alt="Google Logo" />
      Continue with Google
    </button>
  );
};

export default GoogleAuth;
