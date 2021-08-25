import { User } from 'common/types/types';
import { PopularUser } from './common/components/components';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  popularUsers: User[];
};

const PopularUsers: React.FC<Props> = ({ popularUsers }: Props) => {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Popular podcaster</h2>
      {popularUsers.length >= 5 ? (
        <ul
          className={getAllowedClasses(styles.usersRow, styles.groupPodcastes)}
        >
          {popularUsers.map((user) => (
            <>
              <PopularUser key={user.id} user={user} />
            </>
          ))}
        </ul>
      ) : (
        <ul className={styles.usersRow}>
          {popularUsers.map((user) => (
            <>
              <PopularUser key={user.id} user={user} />
            </>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PopularUsers;
