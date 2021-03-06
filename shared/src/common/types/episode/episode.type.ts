import { EpisodeType, EpisodeStatus } from '~/common/enums/enums';
import { Image, Shownote, Record } from '~/common/types/types';

type Episode = {
  id: number;
  name: string;
  userId: number;
  imageId: number | null;
  image: Image | null;
  record: Record | null;
  status: EpisodeStatus;
  podcastId: number;
  createdAt: string;
  updatedAt: string;
  type: EpisodeType;
  shownotes: Shownote[];
  description: string;
};

export type { Episode };
