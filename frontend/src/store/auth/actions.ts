import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserCreatePayload, AsyncThunkConfig, User, UserSignInPayload, UserResetPasswordPayload } from 'common/types/types';
import { StorageKey, AppRoute } from 'common/enums/enums';
import { ActionType } from './common';
import { NotificationMessage, NotificationTitle } from 'common/enums/enums';

const signUp = createAsyncThunk<User, UserCreatePayload, AsyncThunkConfig>
(ActionType.SIGN_UP, async (registerPayload, { extra }) => {
  const { authApi, storageService, notificationService } = extra;
  const { user, token } = await authApi.signUp(registerPayload);

  storageService.setItem(StorageKey.TOKEN, token);

  notificationService.success(NotificationTitle.SUCCESS, NotificationMessage.USER_CREATED);

  return user;
});

const signIn = createAsyncThunk<User, UserSignInPayload, AsyncThunkConfig>
(ActionType.SIGN_IN, async (loginPayload, { extra }) => {
  const { authApi, storageService } = extra;
  const { user, token } = await authApi.signIn(loginPayload);

  storageService.setItem(StorageKey.TOKEN, token);

  return user;
});

const getCurrentUser = createAsyncThunk<User, undefined, AsyncThunkConfig>
(ActionType.LOAD_USER, async (_args, { extra }) => {
  const { authApi } = extra;

  const user = await authApi.getCurrentUser();

  return user;
});

const resetUser = createAsyncThunk<void, undefined, AsyncThunkConfig>
(ActionType.RESET_USER, async (_args, { extra }) => {
  const { storageService } = extra;

  storageService.removeItem(StorageKey.TOKEN);
});

const resetPassword = createAsyncThunk<void, UserResetPasswordPayload, AsyncThunkConfig>
(ActionType.RESET_PASSWORD, async (resetPasswordPayload, { extra }) => {
  const { authApi, notificationService, navigationService } = extra;
  await authApi.resetPassword(resetPasswordPayload);

  notificationService.success(NotificationTitle.SUCCESS, NotificationMessage.PASSWORD_RESETED);
  navigationService.push(AppRoute.SIGN_IN);
});

export { signUp, signIn, getCurrentUser, resetUser, resetPassword };
