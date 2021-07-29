import * as Joi from 'joi';
import { SignInPayload } from '../../common/types/types';

const SignInSchema = Joi.object<SignInPayload>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(3).required(),
});


export { SignInSchema }

