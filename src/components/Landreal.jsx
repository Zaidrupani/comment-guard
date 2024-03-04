import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const Landing = ({ youtubeData }) => {
  console.log('youtubeData:', youtubeData);

  // if (!youtubeData) {
  //   // Render loading or placeholder content
  //   return <p>Loading...</p>;
  // }

  return (
    <div className='landingbg'>
      <div className="landing-container">
        <div className="left-rectangle"> </div>
        <div className='landingtitle'>
          <p className='pland'> My Videos</p>
          <div className='landline' style={{ position: 'absolute', top: '180px' }}></div>
          <div />

          <div className="layout-container">
            <div className="cards-section">
              {youtubeData?.items?.map((video, index) => (
                <div key={index} className="card-wrapper">
                  <Card className="custom-card">
                    <CardContent>
                      <h3>{video.snippet.title}</h3>
                      <p>{video.snippet.description}</p>
                    </CardContent>
                  </Card>
                  <div className="card-info">
                    <p>Additional information for Video {index + 1} <br /> Views: {video.statistics.viewCount} <br /> Likes: {video.statistics.likeCount} <br /> Comments: {video.statistics.commentCount} </p>
                    <button type="button" className="cardButton">Analyze</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;


//
// Landing.jsx
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const Landing = ({ youtubeData }) => {
  console.log('youtubeData:', youtubeData);

  if (!youtubeData || !youtubeData.items || youtubeData.items.length === 0) {
    // Render loading or placeholder content
    console.log('Rendering loading content...');
    return (
      <div className='landingbg'>
        <div className="landing-container">
          <div className="left-rectangle"></div>  
          <div className='landingtitle'>
            <p className='pland'> My Videos</p>
            <div className='landline' style={{ position: 'absolute', top: '180px' }}></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  console.log('Rendering video content');
  return (
    <div className='landingbg'>
      <div className="landing-container">
        <div className="left-rectangle"></div>
        <div className='landingtitle'>
          <p className='pland'> My Videos</p>
          <div className='landline' style={{ position: 'absolute', top: '180px' }}></div>

          <div className="layout-container">
            <div className="cards-section">
              {youtubeData.items.map((video, index) => {
                console.log('Video:', video); // Add this line to log each video data
                return (
                  <div key={index} className="card-wrapper">
                    <Card className="custom-card">
                      <CardContent>
                        <h3>{video.snippet.title}</h3>
                        <p>{video.snippet.description}</p>
                      </CardContent>
                    </Card>
                    <div className="card-info">
                      <p>Additional information for Video {index + 1} <br /> 
                        Views: {video.statistics?.viewCount || 'N/A'} <br /> 
                        Likes: {video.statistics?.likeCount || 'N/A'} <br /> 
                        Comments: {video.statistics?.commentCount || 'N/A'} 
                      </p>
                      <button type="button" className="cardButton">Analyze</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Landing;
