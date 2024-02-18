import { AxiosRssClient } from './services/implementations/AxiosRssClient';
import { EpisodeService } from './services/implementations/EpisodeService';
import { RssToEpisodeMapper } from './services/implementations/RssToEpisodeMapper';
import { NewEpisodeData } from './services/interfaces/IEpisodeService';

const rssClient = new AxiosRssClient();
const episodeMapper = new RssToEpisodeMapper();
const episodeService = new EpisodeService();

const rssFeedUrls = [
  "https://rss.art19.com/masters-of-scale",
  "https://anchor.fm/s/174cb1b8/podcast/rss",
  "https://feeds.transistor.fm/acquired",
  "https://thetwentyminutevc.libsyn.com/rss",
];

async function fetchAndAddEpisodes() {
  for (const url of rssFeedUrls) {
    const items = await rssClient.fetchFeed(url); // Assuming this returns an array of items
    for (const item of items) {
      try {
        // Attempt to map the item to NewEpisodeData
        const episodeData: NewEpisodeData = episodeMapper.map(item);
        await episodeService.addEpisode(episodeData);
      } catch (error) {
        console.error(`Failed to process item from ${url}: ${error}`);
        // Continue processing the next item
      }
    }
  }
}

fetchAndAddEpisodes()
  .then(() => {
    console.log("Finished fetching and adding episodes.");
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
