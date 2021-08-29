import { UserSignInPayload } from 'common/types/types';
import {
  AppRoute,
  ButtonType,
  DataStatus,
  InputType,
  UserPayloadKey,
} from 'common/enums/enums';
import { signIn as signInValidationSchema } from 'validation-schemas/validation-schemas';
import { useAppForm, useAppSelector, useState } from 'hooks/hooks';
import styles from './styles.module.scss';
import { Button, Input, Link } from 'components/common/common';
import { DEFAULT_LOGIN_PAYLOAD } from './common/constants';
import { getAllowedClasses } from 'helpers/helpers';

type Props = {
  onSubmit: (payload: UserSignInPayload) => void;
};

const SignInForm: React.FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, errors } = useAppForm({
    validationSchema: signInValidationSchema,
    defaultValues: DEFAULT_LOGIN_PAYLOAD,
  });

  const { authStatus } = useAppSelector(({ auth }) => ({
    authStatus: auth.dataStatus,
  }));

  const isFormDisable = authStatus === DataStatus.PENDING;

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleToggleVisible = (): void => {
    setIsVisible(!isVisible);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.formTitle}>Sign In</h1>
      <div className={styles.formSubtitle}>
        Don’t have an account?
        <Link to={AppRoute.SIGN_UP} className={styles.link}>
          {' '}
          Sign Up
        </Link>
      </div>
      <fieldset disabled={isFormDisable} className={styles.fieldset}>
        <Input
          type={InputType.EMAIL}
          label="Email"
          placeholder="Enter your email"
          name={UserPayloadKey.EMAIL}
          control={control}
          errors={errors}
        />
        <div className={styles.passwordWrapper}>
          <Input
            type={isVisible ? InputType.TEXT : InputType.PASSWORD}
            label="Password"
            placeholder="Enter your password"
            name={UserPayloadKey.PASSWORD}
            control={control}
            errors={errors}
          />
          <button
            type="button"
            className={isVisible ? getAllowedClasses(styles.showPasswordBtn, styles.visible) : styles.showPasswordBtn}
            onClick={handleToggleVisible}
          />
        </div>
        <div className={styles.formSubtitle}>
          <Link to={AppRoute.RESET_PASSWORD} className={styles.link}>
            Forgot your password?
          </Link>
        </div>
        <Button label="Sign In" type={ButtonType.SUBMIT} />
      </fieldset>
    </form>
  );
};

export default SignInForm;
