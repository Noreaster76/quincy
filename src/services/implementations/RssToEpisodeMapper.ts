import { parseDuration } from '../../utils/TimeConverter';
import { IEpisodeMapper } from '../interfaces/IEpisodeMapper';
import { NewEpisodeData } from '../interfaces/IEpisodeService';

function ensureField<T>(field: T | undefined | null, fieldName: string): T {
  if (field === undefined || field === null) {
    throw new Error(`${fieldName} is missing`);
  }
  return field;
}

export class RssToEpisodeMapper implements IEpisodeMapper {
  map(item: any): NewEpisodeData {
    try {
      const title = ensureField(item.title?.[0], "title");
      const description = ensureField(item.description?.[0], "description");
      const publishedAt = item.pubDate ? new Date(item.pubDate[0]) : undefined;
      const durationInSeconds = item["itunes:duration"]
        ? parseDuration(item["itunes:duration"])
        : undefined;
      const seasonNumber = item["itunes:season"]
        ? parseInt(item["itunes:season"][0])
        : undefined;
      const externalGuid = ensureField(item.guid?.[0]._, "guid");
      const URL = item.link ? item.link[0] : undefined;

      return {
        title,
        description,
        publishedAt,
        durationInSeconds,
        seasonNumber,
        externalGuid,
        URL,
      };
    } catch (error) {
      // Check if 'error' is an instance of Error and thus has a 'message' property
      if (error instanceof Error) {
        throw new Error(`Failed to map RSS item: ${error.message}`);
      } else {
        // If it's not an Error object, handle it accordingly
        throw new Error(`Failed to map RSS item due to an unknown error`);
      }
    }
  }
}
