import { IEpisodeMapper } from '../interfaces/IEpisodeMapper';
import { NewEpisodeData } from '../interfaces/IEpisodeService';

export class RssToEpisodeMapper implements IEpisodeMapper {
  map(item: any): NewEpisodeData {
    return {
      title: item.title[0],
      description: item.description[0],
      // Conditionally set publishedAt only if pubDate is present
      publishedAt: item.pubDate ? new Date(item.pubDate[0]) : undefined,
      durationInSeconds: parseInt(item["itunes:duration"][0]),
      podcast_season_number: item["itunes:season"]
        ? parseInt(item["itunes:season"][0])
        : undefined,
      external_guid: item.guid[0]._,
      URL: item.link[0] ? item.link[0] : undefined,
    };
  }
}
