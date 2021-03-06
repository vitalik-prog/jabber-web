import {
  ApiPath,
  AuthApiPath,
  ContentType,
  HttpMethod,
} from 'common/enums/enums';
import {
  UserCreatePayload,
  UserSignInPayload,
  SignResponse,
  User,
  UserResetPasswordPayload,
} from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class AuthApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public signUp(payload: UserCreatePayload): Promise<SignResponse> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );
  }

  public signIn(payload: UserSignInPayload): Promise<SignResponse> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );
  }

  public resetPassword(payload: UserResetPasswordPayload): Promise<void> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.RESET_PASSWORD}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );
  }

  public getCurrentUser(): Promise<User> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.CURRENT_USER}`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { AuthApi };
