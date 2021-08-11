import { Model } from 'objection';
import { TableName, EpisodeDTOKey } from '~/common/enums/enums';
import { EpisodeType, EpisodeStatus } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';
import { Image } from '~/data/models/image/image.model';
import { Shownote } from '~/data/models/shownote/shownote.model';

class Episode extends Abstract {
  [EpisodeDTOKey.NAME]: string;

  [EpisodeDTOKey.USER_ID]: number;

  [EpisodeDTOKey.PODCAST_ID]: number;

  [EpisodeDTOKey.IMAGE_ID]: number | null;

  [EpisodeDTOKey.IMAGE]: Image | null;

  [EpisodeDTOKey.TYPE]: EpisodeType;

  [EpisodeDTOKey.DESCRIPTION]: string;

  [EpisodeDTOKey.SHOWNOTES]: Shownote[];

  [EpisodeDTOKey.STATUS]: EpisodeStatus;

  static get tableName(): string {
    return TableName.EPISODES;
  }

  static relationMappings = {
    image: {
      relation: Model.HasOneRelation,
      modelClass: Image,
      join: {
        from: 'episodes.image_id',
        to: 'images.id',
      },
    },
    shownotes: {
      relation: Model.HasManyRelation,
      modelClass: Shownote,
      join: {
        from: 'episodes.id',
        to: 'shownotes.episode_id',
      },
    },
  };
}

export { Episode };
