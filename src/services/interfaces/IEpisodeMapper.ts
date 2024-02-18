import { NewEpisodeData } from './IEpisodeService';

export interface IEpisodeMapper {
  map(item: any): NewEpisodeData;
}
