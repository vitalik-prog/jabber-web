import { CommentModel as CommentM } from '~/data/models/models';
import { Comment as TComment, CommentCreatePayload } from '~/common/types/types';

type Constructor = {
  CommentModel: typeof CommentM;
};

class Comment {
  #CommentModel: typeof CommentM;

  constructor({ CommentModel }: Constructor) {
    this.#CommentModel = CommentModel;
  }

  public getAll(): Promise<TComment[]> {
    return this.#CommentModel.query().withGraphFetched('user');
  }

  public create(payload: CommentCreatePayload): Promise<TComment> {
    return this.#CommentModel.query().insert(payload).withGraphFetched('user');
  }

  public getAllByEpisodeId(id: number): Promise<TComment[]> {
    return this.#CommentModel.query()
      .where('episode_id', id)
      .withGraphFetched('user')
      .orderBy('created_at', 'desc');
  }

  public getById(id: string): Promise<TComment> {
    return this.#CommentModel.query().findOne(id).withGraphFetched('user');
  }
}

export { Comment };
