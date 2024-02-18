import { IEpisodeMapper } from '../interfaces/IEpisodeMapper';
import { NewEpisodeData } from '../interfaces/IEpisodeService';

export class RssToEpisodeMapper implements IEpisodeMapper {
  map(item: any): NewEpisodeData {
    return {
      title: item.title[0],
      description: item.description[0],
      // Conditionally set publishedAt only if pubDate is present
      publishedAt: item.pubDate ? new Date(item.pubDate[0]) : undefined,
      durationInSeconds: item["itunes:duration"]
        ? parseInt(item["itunes:duration"][0])
        : undefined,
      podcast_season_number: item["itunes:season"]
        ? parseInt(item["itunes:season"][0])
        : undefined,
      external_guid: item.guid[0]._,
      URL: item.link ? item.link[0] : undefined,
    };
  }
}
