import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import { flexRender, Table } from "@tanstack/react-table";

export interface DataTableProps<T> {
  table: Table<T>;
  columnsLength: number;
  isLoading?: boolean;
  rowsPerPageOptions?: number[];
  totalRows: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  onSortChange?: (columnId: string, direction: "asc" | "desc") => void;
  sort: { columnId: string | null; direction: "asc" | "desc" };
}

const DataTable = <T,>({
  table,
  columnsLength,
  isLoading,
  rowsPerPageOptions = [5, 10, 25],
  totalRows,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onSortChange,
  sort,
}: DataTableProps<T>) => {
  const handleSort = (columnId: string) => {
    const isAsc = sort.columnId === columnId && sort.direction === "asc";
    const direction = isAsc ? "desc" : "asc";
    if (onSortChange) {
      onSortChange(columnId, direction);
    }
  };

  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead sx={{ backgroundColor: "secondary.main" }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
                  sortDirection={
                    sort.columnId === header.id ? sort.direction : false
                  }
                >
                  {header.isPlaceholder ? null : (
                    <TableSortLabel
                      active={sort.columnId === header.id}
                      direction={
                        sort.columnId === header.id ? sort.direction : "asc"
                      }
                      onClick={() => handleSort(header.id)}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columnsLength} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columnsLength} align="center">
                No se encontraron datos
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </MuiTable>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, page) => {
          onPageChange(page);
        }}
        onRowsPerPageChange={(event) => {
          onRowsPerPageChange(parseInt(event.target.value, 10));
        }}
      />
    </TableContainer>
  );
};

export default DataTable;
