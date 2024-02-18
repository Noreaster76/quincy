import { PrismaClient } from '@prisma/client';

import { Episode, IEpisodeService, NewEpisodeData } from '../interfaces/IEpisodeService';

export class EpisodeService implements IEpisodeService {
  private prisma: PrismaClient = new PrismaClient();

  async addEpisode(episodeData: NewEpisodeData): Promise<Episode> {
    return this.prisma.episode.create({
      data: {
        ...episodeData,
        // No need to explicitly map durationInSeconds here if it's named the same in NewEpisodeData and the database
      },
    });
  }
}
