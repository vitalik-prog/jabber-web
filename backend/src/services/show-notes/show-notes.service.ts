import {
  ShowNotes as TShowNotes,
  ShowNotesCreatePayload,
} from '~/common/types/types';
import { showNotes as showNotesRep } from '~/data/repositories/repositories';
import { HttpCode, HttpError } from '../../../../shared/build';
import { ErrorMessage } from '~/common/enums/app/error-message.enum';

type Constructor = {
  showNotesRepository: typeof showNotesRep;
};

class ShowNotes {
  #showNotesRepository: typeof showNotesRep;

  constructor({ showNotesRepository }: Constructor) {
    this.#showNotesRepository = showNotesRepository;
  }

  public create(payload: ShowNotesCreatePayload): Promise<TShowNotes> {
    return this.#showNotesRepository.create(payload);
  }

  public async getAllTimeNotesByEpisodeId(id: string): Promise<TShowNotes[]> {
    return await this.#showNotesRepository.getAllTimeNotesByEpisodeId(id);
  }
}

export { ShowNotes };
