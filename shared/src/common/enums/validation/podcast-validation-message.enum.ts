import { PodcastValidationRule } from './podcast-validation-rule.enum';

const PodcastValidationMessage = {
  PODCAST_NAME_REQUIRE: 'Podcast name is required',
  PODCAST_NAME_MIN_LENGTH: `Podcast name must be at least ${PodcastValidationRule.PODCAST_NAME_MIN_LENGTH} character long`,
  PODCAST_NAME_MAX_LENGTH: `Podcast name must be at most ${PodcastValidationRule.PODCAST_NAME_MAX_LENGTH} characters long`,
  USER_ID_REQUIRE: 'User id required',
  USER_ID_NUMBER_FORMAT: 'User id must be an integer',
  PODCAST_DESCRIPTION_REQUIRE: 'Podcast description is required',
  PODCAST_DESCRIPTION_MIN_LENGTH: `Podcast description must be at least ${PodcastValidationRule.PODCAST_DESCRIPTION_MIN_LENGTH} character long`,
  PODCAST_DESCRIPTION_MAX_LENGTH: `Podcast description must be at most ${PodcastValidationRule.PODCAST_DESCRIPTION_MAX_LENGTH} characters long`,
  DATA_URL_FORMAT: 'Cover image must be valid jpeg, png or svg file',
  FILE_EXTENSION_FORMAT: 'Cover image file must have valid type',
  GENRE_ID_NUMBER_FORMAT: 'Genre id must be an integer',
  GENRE_REQUIRE: 'Genre is required',
  PODCAST_INVITATION_CODE_REQUIRE: 'Podcast invitation code is required',
} as const;

export { PodcastValidationMessage };
