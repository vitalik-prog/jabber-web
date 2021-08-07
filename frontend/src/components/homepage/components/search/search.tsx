import Input from 'components/common/input/input';
import { useAppForm } from 'hooks/hooks';
import { DEFAULT_SEARCH_PAYLOAD } from './common/constants';
import { SearchPayload } from 'common/types/types';
import { IconName } from 'common/enums/ui/ui';
import { FormEvent } from 'common/enums/enums';
import styles from './styles.module.scss';

type Props = {
  onChange: (payload: SearchPayload) => void;
};

const Search: React.FC<Props> = ({ onChange }) => {
  const {
    control,
    handleSubmit,
    errors,
  } = useAppForm({
    defaultValues: DEFAULT_SEARCH_PAYLOAD,
    modeAction: FormEvent.ON_CHANGE,
  });

  return (
    <form
      onChange={handleSubmit(onChange)}
      onSubmit={(e: React.SyntheticEvent): void => e.preventDefault()}
    >
      <div className={styles.searchBlock}>
        <Input
          label=""
          name="search"
          placeholder="Search podcasts..."
          control={control}
          errors={errors}
          icon={IconName.SEARCH}
        />
      </div>
    </form>);
};

export default Search;
