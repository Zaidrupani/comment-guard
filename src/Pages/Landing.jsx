// Landing.jsx
import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link, useNavigate } from 'react-router-dom';
import { handleYouTubeAuthorization } from '../components/Youtubeauth';

const Landing = () => {
  const [youtubeData, setLandingData] = useState(false);
  console.log("yt data", youtubeData[0]);

  const [channelInfo, setChannelInfo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchYouTubeData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const data = await handleYouTubeAuthorization(accessToken);
        setLandingData(data);

        // Extract channel information
        const channelName = data[0]?.items[0]?.snippet?.title;
        console.log('Channel Name:', channelName);

        const totalVideos = data[0]?.items[0]?.statistics?.videoCount;
        const totalViews = data[0]?.items[0]?.statistics?.viewCount;
        const subscriberCount = data[0]?.items[0]?.statistics?.subscriberCount;


        // Set channel information in state
        setChannelInfo({ channelName, totalVideos, totalViews });
      } catch (error) {
        console.error('Error fetching YouTube data:', error);
      }
    };

    // Call the function to fetch YouTube data
    fetchYouTubeData();
  }, []); // Empty dependency array to run the effect only once

  const handleAnalyzeClick = () => {
    // Redirect to the Analyze page
    navigate('/analyze');
  };

  return (
    <>
      {youtubeData ? (
        <div className='landingbg'>
          <div className="landing-container">
            <div className="left-rectangle">
              <div className='circle'> </div>
              <div className='channel-details'> {channelInfo && (
                <>
                  <p className='channel-name'>C{channelInfo.channelName}</p> <br />
                  <p>Video Count: {channelInfo.totalVideos}</p>  <br />
                  <p>Total Views: {channelInfo.totalViews}</p>  <br />
                  <p>Subscribers: {channelInfo.subscriberCount}</p> <br />
                  <div> <button className='refresh'> Refresh </button> </div>
                </>
              )}
              </div>
            </div>
            <div className='landingtitle'>
              <p className='pland'> My Videos</p>
              <div className='landline' style={{ position: 'absolute', top: '180px' }}></div>

              <div className="layout-container">
                <div className="cards-section">
                  {youtubeData.map((video, index) => (
                    <div key={index} className="card-wrapper">
                      <Card className="custom-card">
                        <CardContent>
                          <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            style={{ width: '290px', height: '150px', objectFit: 'cover' }}
                          />
                          <p>{video.items[0].description}</p>
                        </CardContent>
                      </Card>
                      <div className="card-info">
                        <p className='video-title'> Title: {video.title} <br /> </p>
                        <p className='video-stats'>Views: {video.items[0].statistics?.viewCount} <br />
                          Likes: {video.items[0].statistics?.likeCount} <br />
                          Comments: {video.items[0].statistics?.commentCount} </p>
                      </div>
                      <div> <Link to="/analyze">
                        <button type="button" className="analyze-button" onClick={handleAnalyzeClick}>
                          Analyze
                        </button>
                      </Link> </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='landingbg'>
          <div className="landing-container">
            <div className="left-rectangle"></div>
            <div className='landingtitle'>
              <p className='pland'> My Videos</p>
              <div className='landline' style={{ position: 'absolute', top: '180px' }}></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;