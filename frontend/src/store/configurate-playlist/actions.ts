import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDataUrl, getFileFromFileList } from 'helpers/helpers';
import {
  AsyncThunkConfig,
  User,
  PlaylistFormPayload,
} from 'common/types/types';
import { ActionType } from './common';
import { AppRoute, NotificationMessage, NotificationTitle } from 'common/enums/enums';

const create = createAsyncThunk<void, PlaylistFormPayload, AsyncThunkConfig>(
  ActionType.CREATE_PLAYLIST,
  async (playlistPayload, { getState, extra }) => {
    const { playlistApi, notificationService, navigationService } = extra;
    const { auth } = getState();
    const coverFile = getFileFromFileList(playlistPayload.cover);

    const playlist = await playlistApi.create({
      userId: (<User>auth.user).id,
      name: playlistPayload.name,
      description: playlistPayload.description,
      status: playlistPayload.status,
      coverDataUrl: coverFile ? await getDataUrl(coverFile) : null,
    });

    notificationService.success(NotificationTitle.SUCCESS, NotificationMessage.PLAYLIST_CREATED);

    navigationService.push(`${AppRoute.PLAYLISTS}/${playlist.id}`);
  },
);

export { create };
