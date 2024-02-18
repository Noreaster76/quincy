import { PrismaClient } from '@prisma/client';

import { Episode, IEpisodeService, NewEpisodeData } from '../interfaces/IEpisodeService';

export class EpisodeService implements IEpisodeService {
  private prisma: PrismaClient = new PrismaClient();

  async addEpisode(episodeData: NewEpisodeData): Promise<Episode> {
    // Check if an episode with the given external_guid already exists
    const existingEpisode = await this.prisma.episode.findUnique({
      where: {
        external_guid: episodeData.external_guid,
      },
    });

    if (existingEpisode) {
      // If it exists, return the existing episode
      return {
        ...existingEpisode,
        publishedAt: existingEpisode.publishedAt ?? undefined,
        podcast_season_number:
          existingEpisode.podcast_season_number ?? undefined,
      };
    } else {
      // If it doesn't exist, create a new episode
      const newEpisode = await this.prisma.episode.create({
        data: episodeData,
      });
      return {
        ...newEpisode,
        publishedAt: episodeData.publishedAt ?? undefined,
        podcast_season_number: newEpisode.podcast_season_number ?? undefined,
      };
    }
  }
}
