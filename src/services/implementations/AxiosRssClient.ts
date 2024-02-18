import axios from 'axios';
import { parseStringPromise } from 'xml2js';

import { NewEpisodeData } from '../interfaces/IEpisodeService';
import { IRssClient } from '../interfaces/IRssClient';
import { RssToEpisodeMapper } from './RssToEpisodeMapper';

export class AxiosRssClient implements IRssClient {
  private episodeMapper: RssToEpisodeMapper;

  constructor() {
    this.episodeMapper = new RssToEpisodeMapper();
  }

  async fetchFeed(url: string): Promise<NewEpisodeData[]> {
    try {
      const response = await axios.get(url, { responseType: "text" });
      const result = await parseStringPromise(response.data);

      // Map the RSS feed items to NewEpisodeData objects
      const episodes: NewEpisodeData[] = result.rss.channel[0].item.map(
        this.episodeMapper.map
      );
      return episodes;
    } catch (error) {
      console.error(`Failed to fetch or parse RSS feed from ${url}:`, error);
      throw error;
    }
  }
}
