import { AxiosRssClient } from './implementations/AxiosRssClient';
import { EpisodeService } from './implementations/EpisodeService';
import { RssToEpisodeMapper } from './implementations/RssToEpisodeMapper';

const rssClient = new AxiosRssClient();
const mapper = new RssToEpisodeMapper();
const episodeService = new EpisodeService();

// Example RSS Feed URL
const rssFeedUrl = "https://example.com/feed.rss";

async function fetchAndAddEpisodes() {
  try {
    const feedItems = await rssClient.fetchFeed(rssFeedUrl);
    const episodesData = feedItems.map(mapper.map); // Assuming feedItems is an array of items

    // Add each episode to the database
    for (const episodeData of episodesData) {
      const episode = await episodeService.addEpisode(episodeData);
      console.log("Added/Found episode:", episode.title);
    }
  } catch (error) {
    console.error("Failed to fetch or process RSS feed:", error);
    return [];
  }
}

fetchAndAddEpisodes()
  .then(() => {
    console.log("Finished fetching and adding episodes.");
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
