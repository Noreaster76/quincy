import { PrismaClient } from '@prisma/client';

import { Episode, IEpisodeService, NewEpisodeData } from '../interfaces/IEpisodeService';

export class EpisodeService implements IEpisodeService {
  private prisma: PrismaClient = new PrismaClient();

  async addEpisode(episodeData: NewEpisodeData): Promise<Episode> {
    // Check if an episode with the given externalGuid already exists
    const existingEpisode = await this.prisma.episode.findUnique({
      where: {
        externalGuid: episodeData.externalGuid,
      },
    });

    if (existingEpisode) {
      // If it exists, return the existing episode
      return {
        ...existingEpisode,
        durationInSeconds: existingEpisode.durationInSeconds ?? undefined,
        publishedAt: existingEpisode.publishedAt ?? undefined,
        seasonNumber: existingEpisode.seasonNumber ?? undefined,
        URL: existingEpisode.URL ?? undefined,
      };
    } else {
      // If it doesn't exist, create a new episode
      const newEpisode = await this.prisma.episode.create({
        data: episodeData,
      });
      return {
        ...newEpisode,
        durationInSeconds: newEpisode.durationInSeconds ?? undefined,
        publishedAt: newEpisode.publishedAt ?? undefined,
        seasonNumber: newEpisode.seasonNumber ?? undefined,
        URL: newEpisode.URL ?? undefined,
      };
    }
  }
}
