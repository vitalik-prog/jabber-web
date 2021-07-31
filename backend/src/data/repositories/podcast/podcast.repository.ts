import { Podcast as TPodcast, PodcastCreatePayload } from '~/common/types/types';
import { PodcastModel as PodcastM } from '~/data/models/models';

type Constructor = {
  PodcastModel: typeof PodcastM;
};

class Podcast {
  #PodcastModel: typeof PodcastM;

  constructor({ PodcastModel }: Constructor) {
    this.#PodcastModel = PodcastModel;
  }

  public getAll(): Promise<TPodcast[]> {
    return this.#PodcastModel.query();
  }

  public create(payload: PodcastCreatePayload): Promise<TPodcast> {
    return this.#PodcastModel.query().insert(payload);
  }
}

export { Podcast };