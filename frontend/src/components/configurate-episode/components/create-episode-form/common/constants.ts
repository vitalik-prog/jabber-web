import { EpisodePayloadKey, EpisodeType } from 'common/enums/enums';
import { EpisodeFormPayload } from 'common/types/types';
import { DEFAULT_PODCAST_ID } from 'common/constants/constants';

const DEFAULT_CREATE_EPISODE_PAYLOAD: EpisodeFormPayload = {
  [EpisodePayloadKey.NAME]: '',
  [EpisodePayloadKey.DESCRIPTION]: '',
  [EpisodePayloadKey.PODCAST_ID]: DEFAULT_PODCAST_ID,
  [EpisodePayloadKey.TYPE]: EpisodeType.PUBLIC,
  [EpisodePayloadKey.RECORD]: null,
};

export { DEFAULT_CREATE_EPISODE_PAYLOAD };
