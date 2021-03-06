import { Playlist } from 'common/types/types';
import { PlaylistItem } from 'components/common/common';
import styles from './styles.module.scss';

type Props = {
  playlists: Playlist[];
};

const PlaylistsList: React.FC<Props> = ({ playlists }) => (
  <ul className={styles.list}>
    {playlists.map((it) => (
      <PlaylistItem playlist={it} key={it.id} />
    ))}
  </ul>
);

export default PlaylistsList;
