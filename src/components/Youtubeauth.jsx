// YouTubeAuth.js
export const handleYouTubeAuthorization = async (googleAccessToken) => {
  try {
    const apiKey = 'AIzaSyBteZ9hdOcarymodX8PNZ9Rcsz8ivnKLrc'; // Replace with your YouTube API key

    // Fetch user's uploaded videos
    const uploadedVideosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&forMine=true&type=video&key=${apiKey}`,
      {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      }
    );

    if (!uploadedVideosResponse.ok) {
      const errorMessage = await uploadedVideosResponse.text();
      throw new Error(`Error fetching uploaded videos: ${errorMessage}`);
    }

    const channelDetailsData = await uploadedVideosResponse.json();
    const channelImage = channelDetailsData.items[0]?.snippet?.thumbnails?.default.url;
    const uploadedVideosData = await uploadedVideosResponse.json();

    // Create an array to store the video data
    const videos = [];

    // Process each uploaded video
    for (const video of uploadedVideosData.items) {
      const title = video.snippet.title;
      const videoId = video.id.videoId;

      // Fetch additional details for each video
      try {
        const videoDetails = await fetchVideoDetails(apiKey, googleAccessToken, videoId);
        const thumbnailUrl = video.snippet.thumbnails.default.url;
        // console.log('Video Title:', title);
        // console.log('Likes:', videoDetails.statistics?.likeCount || 'N/A');
        // console.log('Views:', videoDetails.statistics?.viewCount || 'N/A');
        // console.log('Comments:', videoDetails.statistics?.commentCount || 'N/A');
        // console.log('------------------------');

        // Add the video data to the videos array
        videos.push({ title: title, thumbnailUrl, ...videoDetails });
      } catch (error) {
        console.error('Error fetching video details:', error.message);
      }
    }

    // Return the videos array
    return { videos, channelImage };

  } catch (error) {
    console.error('Error fetching YouTube data:', error.message);
    throw error; // Re-throw the error to be caught by the calling function
  }
};

const fetchVideoDetails = async (apiKey, googleAccessToken, videoId) => {
  const videoDetailsResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`,
    {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
      },
    }
  );

  if (!videoDetailsResponse.ok) {
    const errorMessage = await videoDetailsResponse.text();
    throw new Error(`Error fetching video details: ${errorMessage}`);
  }

  return videoDetailsResponse.json();
};
