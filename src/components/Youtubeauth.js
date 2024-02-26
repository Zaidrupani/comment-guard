// YouTubeAuth.js

import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

const YouTubeAuth = ({ accessToken, onYouTubeData }) => {
  const apiKey = 'YAIzaSyA4PQzL7UVb3J97GoUOts_jECd3BU2K3bE'; // Replace with your actual API key

  const fetchVideos = async () => {
    try {
      // Fetch the user's channel ID
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&key=${apiKey}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        }
      );

      if (!channelResponse.ok) {
        throw new Error('Error fetching channel details');
      }

      const channelData = await channelResponse.json();
      const channelId = channelData.items[0].id;

      // Fetch the videos from the user's "uploads" playlist with maxResults set to 10
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
    onSuccess: () => {
      fetchVideos();
    },
    onError: (error) => {
      console.error('Google login failed:', error);

      if (error.error === 'popup_closed_by_user') {
        console.log('User closed the login popup.');
      } else {
        console.error('Other login error:', error);
      }
    },
    // Make sure you include the necessary scope for accessing YouTube data
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
  });

  return null; // You can return some UI elements if needed
};

export default YouTubeAuth;
