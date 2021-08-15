import { Episode, Podcast } from 'common/types/types';

enum ActionType {
  LOAD_EPISODE = 'episodes/load-episode',
  LOAD_COMMENTS_BY_EPISODE_ID = 'comments/load-comments-by-episode-id',
  LOAD_EPISODE_PAYLOAD = 'podcast/load-podcast',
  CREATE_COMMENT = 'comments/create-comment',
  UPDATE_COMMENTS = 'comments/update-comments',
}

type LoadEpisodePayload  = {
  episode : Episode;
  podcast: Podcast;
};

export { ActionType };
export type { LoadEpisodePayload };
