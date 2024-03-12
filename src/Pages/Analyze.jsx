import React from 'react';
import '../Styles/Analyze.css'

const Analyze = ({ channelInfo }) => {
    return (
      <div>
       
       <p className='panalyze'> Analysis</p>
       <hr className="analyzeline" />
       <div className="leftrectangle"> </div>
       <div className='thumbnail-rectangle'> </div>
              <div className='channel-details'>
               {channelInfo && (
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

    );
  };

export default Analyze;