import axios from 'axios';
import { parseStringPromise } from 'xml2js';

import { NewEpisodeData } from '../interfaces/IEpisodeService';
import { IRssClient } from '../interfaces/IRssClient';

export class AxiosRssClient implements IRssClient {
  async fetchFeed(url: string): Promise<NewEpisodeData[]> {
    try {
      const response = await axios.get(url, { responseType: "text" });
      const result = await parseStringPromise(response.data);
      // Map the RSS feed items to NewEpisodeData objects
      const episodes: NewEpisodeData[] = result.rss.channel[0].item.map(
        (item: any): NewEpisodeData => ({
          title: item.title[0],
          description: item.description[0],
          publishedAt: new Date(item.pubDate[0]),
          durationInSeconds: parseInt(item["itunes:duration"][0]), // Assuming the RSS feed contains this field
        })
      );
      return episodes;
    } catch (error) {
      console.error(`Failed to fetch or parse RSS feed from ${url}:`, error);
      throw error;
    }
  }
}
