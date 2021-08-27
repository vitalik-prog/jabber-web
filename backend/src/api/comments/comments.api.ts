import { Router } from 'express';
import { ApiPath, HttpCode, CommentsApiPath, HttpMethod } from '~/common/enums/enums';
import {
  commentCreate as commentCreateValidationSchema,
} from '~/validation-schemas/validation-schemas';
import {
  validateSchema as validateSchemaMiddleware,
  checkAuth as checkAuthMiddleware,
  checkUserCommentOwner as checkUserCommentOwnerMiddleware,
} from '~/middlewares/middlewares';
import { comment as commentService } from '~/services/services';
import { handleAsyncApi } from '~/helpers/helpers';

type Args = {
  apiRouter: Router;
  commentService: typeof commentService;
};

const initCommentsApi = ({ apiRouter, commentService }: Args): Router => {
  const commentRouter = Router();

  apiRouter.use(ApiPath.COMMENTS, commentRouter);

  commentRouter.get(
    CommentsApiPath.ROOT,
    handleAsyncApi(async (_req, res) => {
      return res.json(await commentService.getAll()).status(HttpCode.OK);
    }),
  );

  commentRouter.post(
    CommentsApiPath.ROOT,
    checkAuthMiddleware(HttpMethod.POST),
    validateSchemaMiddleware(commentCreateValidationSchema),
    handleAsyncApi(async (req, res) => {
      return res.json(await commentService.create(req.body)).status(HttpCode.CREATED);
    }),
  );

  commentRouter.post(
    CommentsApiPath.COMMENT_REACTIONS,
    checkAuthMiddleware(HttpMethod.POST),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await commentService.createCommentReaction(Number(req.user?.id), Number(req.body.commentId)))
        .status(HttpCode.CREATED);
    }),
  );

  commentRouter.get(
    CommentsApiPath.EPISODE_ID,
    handleAsyncApi(async (req, res) => {
      return res
        .json(await commentService.getAllByEpisodeId(Number(req.params.id)))
        .status(HttpCode.OK);
    }),
  );

  commentRouter.get(
    CommentsApiPath.$ID,
    handleAsyncApi(async (req, res) => {
      return res
        .json(await commentService.getById(Number(req.params.id)))
        .status(HttpCode.OK);
    }),
  );

  commentRouter.delete(
    CommentsApiPath.$ID,
    checkAuthMiddleware(HttpMethod.DELETE),
    checkUserCommentOwnerMiddleware(),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await commentService.delete(Number(req.params.id)))
        .status(HttpCode.OK);
    }),
  );

  return commentRouter;
};

export { initCommentsApi };
