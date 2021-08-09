import { useDispatch, useParams, useEffect, useAppSelector } from 'hooks/hooks';
import { configurateEpisode as configurateEpisodeActions } from 'store/actions';
import { EpisodeFormPayload } from 'common/types/types';
import { PageParams } from './common/types/types';
import { DataStatus } from 'common/enums/enums';
import { mapEpisodeToFormPayload } from './helpers/helpers';
import { Loader } from 'components/common/common';
import { CreateEpisodeForm } from './components/components';

const ConfigurateEpisode: React.FC = () => {
  const { id } = useParams<PageParams>();
  const dispatch = useDispatch();

  const { episode, dataStatus } = useAppSelector(({ configurateEpisode }) => ({
    episode: configurateEpisode.episode,
    dataStatus: configurateEpisode.dataStatus,
  }));

  const mapEpisode = episode ? mapEpisodeToFormPayload(episode) : undefined;

  const isEdit = Boolean(id);

  const isLoading = dataStatus === DataStatus.PENDING;

  const handleFormSubmit = (payload: EpisodeFormPayload): void => {
    isEdit
      ? dispatch(configurateEpisodeActions.editEpisode(payload))
      : dispatch(configurateEpisodeActions.createEpisode(payload));
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(configurateEpisodeActions.loadEpisode(Number(id)));
    }
  }, []);

  return (
    <div>
      <h2>
        {isEdit ? 'Edit' : 'Create'} Episode: {episode?.name ?? ''}
      </h2>
      {isLoading
        ? <Loader />
        : <CreateEpisodeForm
          onSubmit={handleFormSubmit}
          payload={mapEpisode} />
      }
    </div>
  );
};

export default ConfigurateEpisode;
