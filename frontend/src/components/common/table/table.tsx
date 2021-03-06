import { Column, useSortBy } from 'react-table';
import { useTable } from 'hooks/hooks';
import { getAllowedClasses } from 'helpers/helpers';
import Pagination from '../pagination/pagination';
import { DEFAULT_PAGE_COUNT } from 'common/constants/constants';
import styles from './styles.module.scss';

type Props = {
  columns: Column[];
  data: unknown[];
  pageCount?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  totalRowsCount?: number;
  defaultPaginationRows?: number;
  hasPagination?: boolean;
};

const Table: React.FC<Props> = ({
  columns,
  data = [],
  pageCount,
  currentPage,
  onPageChange,
  totalRowsCount,
  defaultPaginationRows,
  hasPagination = false,
}) => {
  const tableInstance = useTable({
    columns: columns as Column<Record<string, string>>[],
    data: data as Record<string, string>[],
  }, useSortBy);

  const hasEnoughPageCount = pageCount as number > DEFAULT_PAGE_COUNT;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
  return (
    <>
      <div className={styles.tableWrapper}>
        <table {...getTableProps()} className={styles.table}>
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup.headers.map((column, i) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} key={i}>
                    <span>{column.render('Header')}</span>
                    <span className={getAllowedClasses([styles.sortIndicator, column.isSorted
                      ? column.isSortedDesc
                        ? styles.desc
                        : styles.asc
                      : null])
                    }>
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={i} className={styles.episodeRow}>
                  {row.cells.map((cell, i) => {
                    return (
                      <td {...cell.getCellProps()} key={i}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {hasPagination &&
        hasEnoughPageCount &&
        <Pagination
          totalRowsCount={totalRowsCount}
          pageCount={pageCount as number}
          onPageChange={onPageChange as (page: number) => void}
          currentPage={currentPage as number}
          defaultPaginationRows={defaultPaginationRows}
          className={styles.pagination}
        />
      }
    </>
  );
};

export default Table;
