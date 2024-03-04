import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { resolve } from 'path';

const authorize = async () => {
  const keyfilePath = resolve(__dirname, 'Credentials', 'credfile.json');
  const auth = await authenticate({
    keyfilePath,
    scopes: ['https://www.googleapis.com/auth/youtube.force-ssl'],
  });
  return auth;
};

const listMyUploads = async () => {
  const auth = await authorize();
  const youtube = google.youtube({ version: 'v3', auth });

  try {
    const res = await youtube.channels.list({
      mine: true,
      part: 'contentDetails',
    });

    const playlistId =
      res.data.items[0].contentDetails.relatedPlaylists.uploads;

    const playlistItems = await youtube.playlistItems.list({
      playlistId,
      part: 'snippet',
      maxResults: 10,
    });

    const uploads = playlistItems.data.items.map(item => ({
      title: item.snippet.title,
      description: item.snippet.description,
    }));

    return uploads;
  } catch (error) {
    console.error('Error listing uploads:', error.message);
    throw error;
  }
};

const Youtube = listMyUploads;
export default Youtube;
listMyUploads()
  .then((result) => console.log(result))
  .catch((err) => console.error(err));
