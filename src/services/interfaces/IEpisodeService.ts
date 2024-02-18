export interface IEpisodeService {
  addEpisode(episodeData: NewEpisodeData): Promise<Episode>;
  // Define other operations like getEpisodes, updateEpisode, deleteEpisode, etc.
}

export type NewEpisodeData = {
  title: string;
  description: string;
  publishedAt: Date;
  durationInSeconds: number; // Renamed from duration
};

export type Episode = {
  id: number;
  title: string;
  description: string;
  publishedAt: Date;
  durationInSeconds: number; // Renamed from duration
};
