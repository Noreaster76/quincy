import { NewEpisodeData } from './IEpisodeService';

export interface IRssClient {
  fetchFeed(url: string): Promise<NewEpisodeData[]>;
}
