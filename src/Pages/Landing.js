


import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function Landing () {

return (
  <div> 
  <p> Hi </p></div>
);
};

// const Landing = ({ youtubeData }) => {
//   console.log('youtubeData:', youtubeData);

//   return (
//     <div className='landingbg'>
//       <div className="landing-container">
//         <div className="left-rectangle"> </div>
//         <div className='landingtitle'>
//           <p className='pland'> My Videos</p>
//           <div className='landline' style={{ position: 'absolute', top: '180px' }}></div>
//           <div />

//           <div className="layout-container">
//             <div className="cards-section">
//               {youtubeData?.items?.map((video, index) => (
//                 <div key={index} className="card-wrapper">
//                   <Card className="custom-card">
//                     <CardContent>
//                       <h3>{video.snippet.title}</h3>
//                       <p>{video.snippet.description}</p>
//                     </CardContent>
//                   </Card>
//                   <div className="card-info">
//                     <p>Additional information for Video {index + 1} <br /> Views: {video.statistics.viewCount} <br /> Likes: {video.statistics.likeCount} <br /> Comments: {video.statistics.commentCount} </p>
//                     <button type="button" className="cardButton">Analyze</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Landing;
