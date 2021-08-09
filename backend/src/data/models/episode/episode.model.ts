import { Model } from 'objection';
import { TableName, EpisodeDTOKey } from '~/common/enums/enums';
import { EpisodeType } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';
import { Image } from '~/data/models/image/image.model';
import { Record } from '~/data/models/record/record.model';

class Episode extends Abstract {
  [EpisodeDTOKey.NAME]: string;

  [EpisodeDTOKey.USER_ID]: number;

  [EpisodeDTOKey.PODCAST_ID]: number;

  [EpisodeDTOKey.IMAGE_ID]: number | null;

  [EpisodeDTOKey.IMAGE]: Image | null;

  [EpisodeDTOKey.RECORD]: Record | null;

  [EpisodeDTOKey.TYPE]: EpisodeType;

  [EpisodeDTOKey.DESCRIPTION]: string;

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
    record: {
      relation: Model.HasOneRelation,
      modelClass: Record,
      join: {
        from: 'episodes.id',
        to: 'records.episode_id',
      },
    },
  };
}

export { Episode };
