import { EpisodeValidationRule } from './episode-validation-rule.enum';

const EpisodeValidationMessage = {
  EPISODE_NAME_REQUIRE: 'Episode name is required',
  EPISODE_NAME_MIN_LENGTH: `Episode name must be at least ${EpisodeValidationRule.EPISODE_NAME_MIN_LENGTH} character long`,
  EPISODE_NAME_MAX_LENGTH: `Episode name must be at most ${EpisodeValidationRule.EPISODE_NAME_MAX_LENGTH} characters long`,
  USER_ID_REQUIRE: 'User id is required',
  USER_ID_NUMBER_FORMAT: 'User id must be an integer',
  PODCAST_ID_REQUIRE: 'Podcast id is required',
  PODCAST_ID_NUMBER_FORMAT: 'Podcast id must be an integer',
} as const;

export { EpisodeValidationMessage };