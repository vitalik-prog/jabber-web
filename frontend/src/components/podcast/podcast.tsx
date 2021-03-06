import { useAppSelector, useDispatch, useEffect, useParams, useState } from 'hooks/hooks';
import { configuratePodcast as configuratePodcastActions, podcast as podcastActions } from 'store/actions';
import { AppRoute, DataStatus, UserRole, PodcastType, PodcastPeriodicity } from 'common/enums/enums';
import { Button, ConfirmPopup, ImageWrapper, Link, Loader } from 'components/common/common';
import { getAllowedClasses, getFilterEpisode } from 'helpers/helpers';
import { EpisodeTable } from './components/components';
import { PageParams } from './common/types/types';
import { getPodcastPeriodicity, getSortedEpisodes } from './helpers/helpers';
import { DEFAULT_EPISODE_PAGINATION } from './common/constatnts/constants';
import styles from './styles.module.scss';

const Podcast: React.FC = () => {
  const {
    userId,
    podcast,
    episodes,
    dataStatus,
    userRole,
    isFollowed,
    followersCount,
    followersDataStatus,
    countEpisodes,
    episodesDataStatus,
  } = useAppSelector(
    ({ podcast, auth }) => ({
      userId: auth.user?.id,
      userRole: auth.user?.role,
      podcast: podcast.podcast,
      episodes: podcast.episodes,
      dataStatus: podcast.dataStatus,
      isFollowed: podcast.isFollowed,
      followersCount: podcast.followersCount,
      followersDataStatus: podcast.followersDataStatus,
      countEpisodes: podcast.totalCount,
      episodesDataStatus: podcast.episodesDataStatus,
    }),
  );
  const dispatch = useDispatch();
  const { id } = useParams<PageParams>();
  const isOwner = userId === podcast?.userId;
  const isMaster = userRole === UserRole.MASTER;
  const isAllowDelete = isOwner || isMaster;
  const isLoading = dataStatus === DataStatus.PENDING || followersDataStatus === DataStatus.PENDING;
  const isEpisodesLoading = episodesDataStatus === DataStatus.PENDING;
  const isPrivatePodcast = podcast?.type === PodcastType.PRIVATE;
  const isAutoPeriodicity = podcast?.periodicity === PodcastPeriodicity.AUTO;
  const estimatedPodcastPeriodicity = getPodcastPeriodicity(episodes);
  const sortedEpisodes = getSortedEpisodes(episodes);
  const [episodePagination, setEpisodePagination] = useState(DEFAULT_EPISODE_PAGINATION);

  const totalPagesCount = Math.ceil(countEpisodes / episodePagination.row);

  useEffect(() => {
    dispatch(podcastActions.loadPodcast(Number(id)));
  }, []);

  useEffect(() => {
    dispatch(podcastActions.loadEpisodesByPodcastId({
      podcastId: Number(id),
      filter: getFilterEpisode(episodePagination.page, episodePagination.row),
    }));
  }, [episodePagination]);

  useEffect(() => {
    if (podcast && userId) {
      dispatch(podcastActions.checkIsFollowedPodcast({
        podcastId: podcast.id,
        followerId: userId,
      }));
    }
    if (podcast) {
      dispatch(podcastActions.getFollowersCount(podcast.id));
    }
  }, [podcast, userId]);

  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState<boolean>(false);

  const handleDeletePodcast = (): void => {
    dispatch(
      configuratePodcastActions.deletePodcast({
        podcastId: Number(id),
        userId: Number(userId),
      }),
    );
  };

  const handleShowPopup = (): void => {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
  };

  const handleToggleFollow = (): void => {
    if (podcast && userId) {
      dispatch(podcastActions.toggleFollowPodcast({
        podcastId: podcast.id,
        followerId: userId,
      }));
    }
  };

  const handlePageChange = (selectedPage: number): void => {
    setEpisodePagination({
      page: selectedPage,
      row: episodePagination.row,
    });
  };

  const handleCopyInviteLink = (): void => {
    if (podcast) {
      dispatch(podcastActions.copyInviteLink(podcast?.id));
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <main className={styles.podcast}>
      {podcast && dataStatus === DataStatus.FULFILLED ? (
        <>
          <div className={styles.content}>
            <ImageWrapper
              src={podcast.cover?.url}
              loading="lazy"
              alt={podcast.name}
              label={podcast.name}
              className={styles.imageWrapper}
            />
            {podcast.userId === userId
              ? (
                <Button
                  className={styles.addEpisodeLink}
                  label="Add episode"
                  href={`${AppRoute.PODCASTS}/${podcast.id}${AppRoute.EPISODES_EDIT}`}
                />
              )
              : userId && (
                <Button
                  className={styles.followButton}
                  label={isFollowed ? 'Unfollow' : 'Follow'}
                  onClick={handleToggleFollow}
                />
              )
            }
            <div className={styles.podcastInfoWrapper}>
              {isOwner && (
                <Link
                  to={`${AppRoute.PODCASTS_EDIT}/${podcast.id}`}
                  className={styles.editLink}
                  title="Edit podcast"
                />
              )}
              {isAllowDelete && (
                <>
                  <button
                    onClick={handleShowPopup}
                    className={styles.deleteButton}
                    title="Delete podcast"
                  >
                    <span className="visually-hidden">Delete episode</span>
                  </button>
                  <ConfirmPopup
                    title="Delete Podcast"
                    description="You are going to delete the podcast. Are you sure about this?"
                    isOpen={isConfirmPopupOpen}
                    onClose={handleShowPopup}
                    onConfirm={handleDeletePodcast}
                  />
                </>
              )}
              <h1 className={styles.title}>{podcast.name}</h1>
              <p className={styles.description}>{podcast.description}</p>
              <ul className={styles.infoList}>
                <li className={styles.infoItem}>
                  <div
                    className={getAllowedClasses(styles.infoName, styles.host)}
                  >
                    Host
                  </div>
                  <Link
                    className={styles.infoInner}
                    to={`${AppRoute.USERS}/${podcast.userId}`}
                  >
                    {podcast.user.nickname}
                  </Link>
                </li>
                {Boolean(episodes.length) && (
                  <li className={styles.infoItem}>
                    <div
                      className={getAllowedClasses(
                        styles.infoName,
                        styles.episodes,
                      )}
                    >
                      Episodes
                    </div>
                    <p className={styles.infoInner}>
                      {countEpisodes} episodes
                    </p>
                  </li>
                )}
                <li className={styles.infoItem}>
                  <div
                    className={getAllowedClasses(
                      styles.infoName,
                      styles.period,
                    )}
                  >
                    ??eriodicity
                  </div>
                  <p className={styles.infoInner}>{isAutoPeriodicity ? estimatedPodcastPeriodicity : podcast.periodicity}</p>
                </li>
                {podcast.genre && (
                  <li className={styles.infoItem}>
                    <div
                      className={getAllowedClasses(
                        styles.infoName,
                        styles.genre,
                      )}
                    >
                      Genre
                    </div>
                    <p className={styles.infoInner}>{podcast.genre.name}</p>
                  </li>
                )}
                <li className={styles.infoItem}>
                  <div
                    className={getAllowedClasses(styles.infoName, styles.type)}
                  >
                    Type
                  </div>
                  {isOwner && isPrivatePodcast ?
                    <button className={styles.copyInvitation} onClick={handleCopyInviteLink}>Private (copy link)</button> : <p className={styles.infoInner}>{podcast.type}</p>
                  }
                </li>
                <li className={styles.infoItem}>
                  <div
                    className={getAllowedClasses(styles.infoName, styles.followers)}
                  >
                    Followers
                  </div>
                  <p className={styles.infoInner}>{followersCount}</p>
                </li>
              </ul>
            </div>
          </div>
          {episodes.length
            ? isEpisodesLoading
              ? <Loader />
              : <EpisodeTable
                episodes={sortedEpisodes}
                pageCount={totalPagesCount}
                currentPage={episodePagination.page}
                onPageChange={handlePageChange}
                totalEpisodesCount={countEpisodes}
              />
            : (
              <div className={styles.placeholder}>
                There are no episodes in this podcast yet.
              </div>
            )}
        </>
      ) : (
        <h1 className={styles.notFound}>Oops. There is no such podcast</h1>
      )}
    </main>
  );
};

export default Podcast;
