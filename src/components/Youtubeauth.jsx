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

    const uploadedVideosData = await uploadedVideosResponse.json();

    // Get the channel ID from the first video
    const channelId = uploadedVideosData.items[0]?.snippet?.channelId;

    // Fetch channel details
    const channelDetailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${apiKey}`,
      {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      }
    );

    if (!channelDetailsResponse.ok) {
      const errorMessage = await channelDetailsResponse.text();
      throw new Error(`Error fetching channel details: ${errorMessage}`);
    }

    const channelDetailsData = await channelDetailsResponse.json();

    // Extract relevant channel information
    const channelName = channelDetailsData.items[0]?.snippet?.title;
    const totalVideos = channelDetailsData.items[0]?.statistics?.videoCount;
    const totalViews = channelDetailsData.items[0]?.statistics?.viewCount;
    const subscriberCount = channelDetailsData.items[0]?.statistics?.subscriberCount;
    // Log or return the extracted information
    console.log('Channel Name:', channelName);
    console.log('Total Videos:', totalVideos);
    console.log('Total Views:', totalViews);
    console.log('Subscriber Count:', subscriberCount);


    // Process each uploaded video
    const videos = [];

    for (const video of uploadedVideosData.items) {
      const title = video.snippet.title;
      const videoId = video.id.videoId;

      // Fetch additional details for each video
      try {
        const videoDetails = await fetchVideoDetails(apiKey, googleAccessToken, videoId);
        const thumbnailUrl = video.snippet.thumbnails.default.url;

        // Add the video data to the videos array
        videos.push({ title: title, thumbnailUrl, ...videoDetails });
      } catch (error) {
        console.error('Error fetching video details:', error.message);
      }
    }

    // Return the videos array
    return videos;

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
