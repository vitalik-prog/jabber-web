import { PodcastType } from '~/common/enums/enums';

type PodcastCreateDTOPayload = {
  name: string;
  userId: number;
  imageId: number | null;
  coverId : number | null;
  description: string;
  type: PodcastType;
  genreId: number;
};

export type { PodcastCreateDTOPayload };
