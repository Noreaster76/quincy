import { PrismaClient } from '@prisma/client';

class EpisodeService implements IEpisodeService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async addEpisode(episodeData: NewEpisodeData): Promise<Episode> {
    const episode = await this.prisma.episode.create({
      data: episodeData,
    });
    return episode;
  }

  // Implement other methods defined in the interface
}
