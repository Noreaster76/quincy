import { AxiosRssClient } from './implementations/AxiosRssClient';

async function fetchAndProcessRssFeed() {
  const rssClient = new AxiosRssClient();
  const newEpisodesData = await rssClient.fetchFeed("https://example.com/rss");
  console.log(newEpisodesData); // Now an array of NewEpisodeData objects
  // Here, loop through newEpisodesData and add each to database
}

fetchAndProcessRssFeed().catch(console.error);
