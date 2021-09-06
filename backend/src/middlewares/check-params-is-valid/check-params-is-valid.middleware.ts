import { RequestHandler } from 'express';
import { HttpError } from '~/exceptions/exceptions';
import { ErrorMessage, HttpCode } from '~/common/enums/enums';
import { MAX_POSSIBLE_ID } from '~/common/constants/constants';

const checkParamsIsValid = (): RequestHandler => {
  const handler: RequestHandler = (req, _res, next) => {

    const params = Object.values(req.params);

    params.forEach((param) => {
      if (isNaN(Number(param)) || Number(param) > MAX_POSSIBLE_ID) {
        return next(new HttpError({
          status: HttpCode.BAD_REQUEST,
          message: ErrorMessage.BAD_REQUEST,
        }));
      }
    });

    return next();
  };

  return handler;
};

export { checkParamsIsValid };
