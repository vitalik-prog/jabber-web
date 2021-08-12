import { SearchPayloadKey } from '../enums/search';

type SearchPayload = {
  [SearchPayloadKey.SEARCH]: string,
};

export type { SearchPayload };
