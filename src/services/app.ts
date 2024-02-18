import { AxiosRssClient } from './implementations/AxiosRssClient';
import { EpisodeService } from './implementations/EpisodeService';
import { RssToEpisodeMapper } from './implementations/RssToEpisodeMapper';

const rssClient = new AxiosRssClient();
const mapper = new RssToEpisodeMapper();
const episodeService = new EpisodeService();

const rssFeedUrls = [
  "https://rss.art19.com/masters-of-scale",
  "https://anchor.fm/s/174cb1b8/podcast/rss",
  "https://feeds.transistor.fm/acquired",
  "https://thetwentyminutevc.libsyn.com/rss",
];

async function fetchAndAddEpisodes() {
  for (const url of rssFeedUrls) {
    try {
      const feedData = await rssClient.fetchFeed(url);
      const episodesData = feedData.map(mapper.map);

      for (const episodeData of episodesData) {
        await episodeService.addEpisode(episodeData);
        console.log(`Added episode: ${episodeData.title}`);
      }
    } catch (error) {
      console.error(`Error processing feed ${url}:`, error);
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
