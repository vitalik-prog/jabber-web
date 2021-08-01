import * as Joi from 'joi';
import {
  EpisodeValidationRule,
  EpisodeValidationMessage,
  EpisodeCreatePayloadKey,
} from '~/common/enums/enums';
import { EpisodeCreatePayload } from '~/common/types/types';

const episode = Joi.object<EpisodeCreatePayload>({
  [EpisodeCreatePayloadKey.NAME]: Joi.string()
    .min(EpisodeValidationRule.EPISODE_NAME_MIN_LENGTH)
    .max(EpisodeValidationRule.EPISODE_NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': EpisodeValidationMessage.EPISODE_NAME_REQUIRE,
      'string.min': EpisodeValidationMessage.EPISODE_NAME_MIN_LENGTH,
      'string.max': EpisodeValidationMessage.EPISODE_NAME_MAX_LENGTH,
    }),
  [EpisodeCreatePayloadKey.USER_ID]: Joi.number()
    .integer()
    .required()
    .messages({
      'number.required': EpisodeValidationMessage.USER_ID_REQUIRE,
      'number.integer': EpisodeValidationMessage.USER_ID_NUMBER_FORMAT,
    }),
  [EpisodeCreatePayloadKey.PODCAST_ID]: Joi.number()
    .integer()
    .required()
    .messages({
      'number.required': EpisodeValidationMessage.PODCAST_ID_REQUIRE,
      'number.integer': EpisodeValidationMessage.PODCAST_ID_NUMBER_FORMAT,
    }),
});

export { episode };