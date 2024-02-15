interface IEpisodeService {
  addEpisode(episodeData: NewEpisodeData): Promise<Episode>;
  // Define other operations like getEpisodes, updateEpisode, deleteEpisode, etc.
}

type NewEpisodeData = {
  title: string;
  description: string;
  publishedAt: Date;
  duration: number;
};

type Episode = {
  id: number;
  title: string;
  description: string;
  publishedAt: Date;
  duration: number;
};
