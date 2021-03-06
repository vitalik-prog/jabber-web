import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Episode } from 'common/types/types';
import { create, edit, loadEpisode, deleteEpisode, resetState } from './actions';

type State = {
  dataStatus: DataStatus;
  formDataStatus: DataStatus;
  episode: Episode | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  formDataStatus: DataStatus.IDLE,
  episode: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(create.pending, (state) => {
    state.formDataStatus = DataStatus.PENDING;
  });
  builder.addCase(create.fulfilled, (state) => {
    Object.assign(state, initialState);
  });
  builder.addCase(create.rejected, (state) => {
    state.formDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(edit.pending, (state) => {
    state.formDataStatus = DataStatus.PENDING;
  });
  builder.addCase(edit.fulfilled, (state) => {
    Object.assign(state, initialState);
  });
  builder.addCase(edit.rejected, (state) => {
    state.formDataStatus = DataStatus.REJECTED;
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
  builder.addCase(deleteEpisode.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(deleteEpisode.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.episode = null;
  });
  builder.addCase(deleteEpisode.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(resetState, (state) => {
    Object.assign(state, initialState);
  });
});

export { reducer };
