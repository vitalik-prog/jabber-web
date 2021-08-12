import { AppRoute } from 'common/enums/enums';
import { Podcast as TPodcast } from 'common/types/types';
import { Link } from 'components/common/common';
import defaultImage from 'assets/img/default-podcast-image.jpeg';
import styles from './styles.module.scss';

type Props = {
  podcast: TPodcast;
};

const Podcast: React.FC<Props> = ({ podcast }) => (
  <li className={styles.wrapper}>
    <div className={styles.imageWrapper}>
      <img
        src={podcast.image?.url ?? defaultImage}
        className={styles.podcastImage}
        width="195"
        height="195"
        loading="lazy"
      />
    </div>
    <h3 className={styles.title}>
      <Link to={`${AppRoute.PODCASTS}/${podcast.id}`} className={styles.link}>
        {podcast.name}
      </Link>
    </h3>
  </li>
);

export default Podcast;