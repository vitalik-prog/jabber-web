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
  toggleCommentLike,
  updateCommentsAfterLike,
} from './actions';

type State = {
  dataStatus: DataStatus;
  commentDataStatus: DataStatus;
  episode: Episode | null;
  comments: Comment[];
  podcast: Podcast | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  commentDataStatus: DataStatus.IDLE,
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

  builder.addCase(toggleCommentLike.pending, (state) => {
    state.commentDataStatus = DataStatus.PENDING;
  });
  builder.addCase(toggleCommentLike.fulfilled, (state) => {
    state.commentDataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(toggleCommentLike.rejected, (state) => {
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

  builder.addCase(updateCommentsAfterLike, (state, action) => {
    const filtered = state.comments.filter((comment) => comment.id !== action.payload.id);
    const commetns = [action.payload, ...filtered].sort((commentA, commentB) => commentB.id - commentA.id);
    state.comments = commetns;
  });
  builder.addCase(updateCommentsAfterDelete, (state, action) => {
    state.comments = state.comments.filter((comment) => comment.id !== action.payload.id);
  });
  builder.addCase(updateComments, (state, action) => {
    state.comments = [action.payload, ...state.comments];
  });
});

export { reducer };
