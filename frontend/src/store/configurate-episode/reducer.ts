import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Episode } from 'common/types/types';
import { create, edit, loadEpisode } from './actions';

type State = {
  dataStatus: DataStatus;
  episode: Episode | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  episode: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(create.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(create.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.episode = action.payload;
  });
  builder.addCase(create.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(edit.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(edit.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.episode = action.payload;
  });
  builder.addCase(edit.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(loadEpisode.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadEpisode.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.episode = action.payload;
  });
  builder.addCase(loadEpisode.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
