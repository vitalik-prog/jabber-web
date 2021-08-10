import { Column } from 'react-table';
import { INCREASE_CONT_FOR_IDX } from 'common/constants/constants';

const getColumns = (): Column[] => {
  const columns: Column[] = [
    {
      Header: '#',
      accessor: (_originalRow, rowIndex): number => {
        return rowIndex + INCREASE_CONT_FOR_IDX;
      },
    },
    {
      Header: 'Name and Host',
      accessor: 'name',
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
    },
  ];

  return columns;
};

export { getColumns };
