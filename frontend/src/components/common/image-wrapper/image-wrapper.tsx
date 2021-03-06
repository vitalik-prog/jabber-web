import { getAllowedClasses } from 'helpers/helpers';
import { DEFAULT_IMAGE_ALT, DEFAULT_LABEL } from './common/constants/constants';
import {
  getDefaultImageStyle,
  getLabelSubstring,
} from './common/helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  width?: string;
  height?: string;
  loading?: 'lazy' | 'eager';
  src?: string;
  alt?: string;
  label?: string;
  className?: string;
};

const ImageWrapper: React.FC<Props> = ({
  width,
  height,
  loading,
  src,
  alt = DEFAULT_IMAGE_ALT,
  label = DEFAULT_LABEL,
  className,
}) => {
  return (
    <div
      style={getDefaultImageStyle({ width, height })}
      className={getAllowedClasses(className, styles.imageWrapper)}
    >
      {src ? (
        <img
          src={src}
          width={width}
          height={height}
          loading={loading}
          alt={alt}
          className={styles.image}
        />
      ) : (
        <div className={styles.containerLabel}>
          <span className={styles.label}>{getLabelSubstring(label)}</span>
        </div>
      )}
    </div>
  );
};

export default ImageWrapper;
