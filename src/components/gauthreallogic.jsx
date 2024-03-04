import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';



const GoogleAuth = ({ setUser, onLoginSuccess, onLoginError }) => {
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("login is succesful")
      onLoginSuccess();
      console.log(tokenResponse);
      localStorage.setItem('accessToken', tokenResponse.access_token)
      setUser(tokenResponse.access_token);
      navigate('/');
    },
    onError: (error) => {
      console.error('Google login failed:', error);

      if (error.error === 'popup_closed_by_user') {
        console.log('User closed the login popup.');
      } else {
        console.error('Other login error:', error);
      }

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
