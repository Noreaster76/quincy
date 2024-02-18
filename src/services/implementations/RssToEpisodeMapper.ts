import { IEpisodeMapper } from '../interfaces/IEpisodeMapper';
import { NewEpisodeData } from '../interfaces/IEpisodeService';

export class RssToEpisodeMapper implements IEpisodeMapper {
  map(item: any): NewEpisodeData {
    return {
      title: item.title[0],
      description: item.description[0],
      publishedAt: new Date(item.pubDate[0]),
      durationInSeconds: parseInt(item["itunes:duration"][0]),
      podcast_season_number: parseInt(item["itunes:season"][0]),
      external_guid: item.guid[0]._,
      URL: item.link[0],
    };
  }
}
