import React, { useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

const YouTubeAuth = ({ accessToken, onYouTubeData }) => {
  const apiKey = 'AIzaSyA4PQzL7UVb3J97GoUOts_jECd3BU2K3bE'; // Replace with your actual API key

  const fetchVideos = async () => {
    try {
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

      console.log('Videos request complete.');

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
      console.log('Google login success');
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
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
  });

  // Use useEffect to fetch videos when the component mounts
  useEffect(() => {
    if (accessToken) {
      fetchVideos();
    }
  }, [accessToken, fetchVideos]);
  

  return null;
};

export default YouTubeAuth;
