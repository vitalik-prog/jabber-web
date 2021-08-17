import { ImageWrapper } from 'components/common/common';
import { Comment as TComment } from 'common/types/types';
import { Dimentions } from './common/types/types';
import { getCommentOffset } from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  comment: TComment;
  dimensions: Dimentions;
  duration: number;
  handleGoToTimestamp: (timestamp: number) => () => void;
};

const TimelineItem: React.FC<Props> = ({
  comment,
  dimensions,
  duration,
  handleGoToTimestamp,
}) => {
  const commentOffset = getCommentOffset(
    duration,
    comment.timestamp,
    dimensions,
  );

  return (
    <button
      className={styles.timelineItem}
      style={{ left: `${commentOffset}%` }}
      onClick={handleGoToTimestamp(comment.timestamp)}
    >
      <div className={styles.timelineItemContent}>
        <ImageWrapper
          width="30"
          height="30"
          loading="lazy"
          alt={String(comment.userId)}
          label={comment.user.nickname}
          className={styles.avatarWrapper}
        />
        <div className={styles.timelineItemInfo}>
          <div>{comment.user.nickname}</div>
          <div>{comment.text}</div>
        </div>
      </div>
    </button>
  );
};

export default TimelineItem;
