import { UserPayloadKey } from '~/common/enums/enums';
import { UserPayload } from './user-payload.type';

type UserEditPayload = UserPayload & {
  [UserPayloadKey.FIRST_NAME]: string;
  [UserPayloadKey.LAST_NAME]: string;
  [UserPayloadKey.NICKNAME]: string;
  [UserPayloadKey.BIRTHDATE]: Date;
  [UserPayloadKey.BIO]: string;
  [UserPayloadKey.IMAGE_DATA_URL]: string | null;
  [UserPayloadKey.IMAGE_ID]: number | null;
};

export type { UserEditPayload };
