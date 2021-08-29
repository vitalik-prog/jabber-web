import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Episode, Comment, Podcast } from 'common/types/types';
import {
  loadEpisodePayload,
  loadCommentsByEpisodeId,
  createComment,
  updateComments,
  deleteComment,
  updateCommentsAfterDelete,
  checkEpisodeIsFavorite,
  toggleFavourite,
} from './actions';

type State = {
  dataStatus: DataStatus;
  commentDataStatus: DataStatus;
  favouriteDataStatus: DataStatus;
  isFavourite: boolean;
  episode: Episode | null;
  comments: Comment[];
  podcast: Podcast | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  commentDataStatus: DataStatus.IDLE,
  favouriteDataStatus: DataStatus.IDLE,
  isFavourite: false,
  episode: null,
  comments: [],
  podcast: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadEpisodePayload.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadEpisodePayload.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.episode = action.payload.episode;
    state.podcast = action.payload.podcast;
  });
  builder.addCase(loadEpisodePayload.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(loadCommentsByEpisodeId.pending, (state) => {
    state.commentDataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadCommentsByEpisodeId.fulfilled, (state, action) => {
    state.commentDataStatus = DataStatus.FULFILLED;
    state.comments = action.payload.reverse();
  });
  builder.addCase(loadCommentsByEpisodeId.rejected, (state) => {
    state.commentDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(createComment.pending, (state) => {
    state.commentDataStatus = DataStatus.PENDING;
  });
  builder.addCase(createComment.fulfilled, (state) => {
    state.commentDataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(createComment.rejected, (state) => {
    state.commentDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(deleteComment.pending, (state) => {
    state.commentDataStatus = DataStatus.PENDING;
  });
  builder.addCase(deleteComment.fulfilled, (state) => {
    state.commentDataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(deleteComment.rejected, (state) => {
    state.commentDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(updateCommentsAfterDelete, (state, action) => {
    state.comments = state.comments.filter((comment) => comment.id !== action.payload.id);
  });
  builder.addCase(updateComments, (state, action) => {
    state.comments = [action.payload, ...state.comments];
  });
  builder.addCase(checkEpisodeIsFavorite.pending, (state) => {
    state.favouriteDataStatus = DataStatus.PENDING;
  });
  builder.addCase(checkEpisodeIsFavorite.fulfilled, (state, action) => {
    state.favouriteDataStatus = DataStatus.FULFILLED;
    state.isFavourite = action.payload;
  });
  builder.addCase(checkEpisodeIsFavorite.rejected, (state) => {
    state.favouriteDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(toggleFavourite.fulfilled, (state, action) => {
    state.isFavourite = action.payload;
  });
});

export { reducer };
