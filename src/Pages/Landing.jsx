// Landing.jsx
import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { handleYouTubeAuthorization } from '../components/Youtubeauth';

const Landing = () => {
  const [youtubeData, setLandingData] = useState(false);
  const [channelImage, setChannelImage] = useState(null);

  console.log("yt data", youtubeData[0]);
  useEffect(() => {
    // Assuming you have a function to fetch YouTube data
    console.log("lol");
    const fetchYouTubeData = async () => {
      try {
        // Fetch YouTube data here
        console.log(handleYouTubeAuthorization);
        const accessToken = localStorage.getItem('accessToken');
        const data = await handleYouTubeAuthorization(accessToken);
        console.log('Updated landingData:', data);
        setLandingData(data);
        const channelImageUrl = data[0]?.channelImageUrl;
        setChannelImage(channelImageUrl);

        console.log('Updated landingData:', data);
        console.log('Channel Image:', channelImageUrl);
      } catch (error) {
        console.error('Error fetching YouTube data:', error);
      }
    };

    // Call the function to fetch YouTube data
    fetchYouTubeData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <>
      {
        !youtubeData ?
          (<>
            <div className='landingbg'>
              <div className="landing-container">
                <div className="left-rectangle"></div>
                <div className='landingtitle'>
                  <p className='pland'> My Videos</p>
                  <div className='landline' style={{ position: 'absolute', top: '180px' }}></div>
                </div>
              </div>
            </div>
          </>)
          :
          (<>
            <div className='landingbg'>
              <div className="landing-container">
                <div className="left-rectangle"></div>
                <div className='left-rectangle'>
                  <div className='circle'>
                    {channelImage && (
                      <img
                        src={channelImage}
                        alt="Channel Profile"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '50%',
                        }}
                      />
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
                          <div> <button type="button" className="cardButton">Analyze</button> </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>)
      }
    </>
  );
}

export default Landing;
