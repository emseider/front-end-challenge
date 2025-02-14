import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography, Button, Stack, Alert, Box } from "@mui/material";
import {
  searchInvoices,
  deleteInvoice,
  buildFilterQuery,
  SearchInvoicesParams,
} from "../../services/invoice.service";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DataTable from "../../components/DataTable/data.table";
import MainLayout from "../../layouts/MainLayout/main.layout";
import Actions from "../../components/Actions";
import Modal from "../../components/Modal";
import Status from "../../components/StatusTag";
import Filters from "../../components/Filters";
import dayjs from "dayjs";
import { Filter, InvoiceResponse, Invoice } from "../../types";
import Client from "../../components/Client/client";
import { generateLetterColors } from "../../utils";

const InvoiceListPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<
    number | string | null
  >(null);

  const [filters, setFilters] = useState<Filter>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState<{
    columnId: string | null;
    direction: "asc" | "desc";
  }>({ columnId: null, direction: "asc" });

  const {
    data: invoiceData,
    isLoading,
    isError,
    error,
  } = useQuery<InvoiceResponse>({
    queryKey: ["invoices", filters, page, rowsPerPage, sort],
    queryFn: async () => {
      const params: SearchInvoicesParams = {
        top: rowsPerPage,
        skip: page * rowsPerPage,
      };
      if (filters) {
        params.filter = buildFilterQuery(filters);
      }
      if (sort.columnId) {
        params.orderBy = `${sort.columnId} ${sort.direction}`;
      }
      return await searchInvoices(params);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number | string) => deleteInvoice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });

  const handleCreate = () => {
    navigate("/invoices/create");
  };

  const handleEdit = useCallback(
    (id: number | string) => {
      navigate(`/invoices/edit/${id}`);
    },
    [navigate]
  );

  const handleDelete = useCallback((id: number | string) => {
    setSelectedInvoiceId(id);
    setOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (selectedInvoiceId !== null) {
      deleteMutation.mutate(selectedInvoiceId);
      setOpen(false);
      setSelectedInvoiceId(null);
    }
  }, [deleteMutation, selectedInvoiceId]);

  const columns = useMemo<ColumnDef<Invoice>[]>(
    () => [
      {
        accessorKey: "customerToFullName",
        header: "Cliente",
        cell: ({ row: { original } }) => {
          const letterColors = generateLetterColors();
          const firstLetter = original.customerToFullName
            .charAt(0)
            .toLowerCase();
          return (
            <Client
              name={original.customerToFullName}
              invoiceNumber={original.no}
              color={letterColors[firstLetter]}
            />
          );
        },
      },
      {
        accessorKey: "creationTime",
        header: "Creación",
        cell: ({ cell }) => {
          const date = dayjs(cell.renderValue<string>());
          const formatedDate = date.format("DD MMM YYYY");
          return (
            <Box>
              <Typography fontSize={14}>{formatedDate}</Typography>
              <Typography variant="caption" color="textSecondary">
                {date.format("hh:mm A")}
              </Typography>
            </Box>
          );
        },
      },
      {
        accessorKey: "dueDateTime",
        header: "Vencimiento",
        cell: ({ cell }) => {
          const date = dayjs(cell.renderValue<string>());
          const formatedDate = date.format("DD MMM YYYY");
          return (
            <Box>
              <Typography fontSize={14}>{formatedDate}</Typography>
              <Typography variant="caption" color="textSecondary">
                {date.format("hh:mm A")}
              </Typography>
            </Box>
          );
        },
      },
      {
        accessorKey: "amount",
        header: "Monto",
      },
      {
        accessorKey: "status",
        header: "Estatus",
        cell: ({ cell }) => {
          return <Status status={cell.renderValue<string>()} />;
        },
      },
      {
        id: "acciones",
        header: "",
        cell: ({ row }) => (
          <Actions
            items={[
              {
                id: "editar",
                label: "Editar",
                icon: <EditIcon />,
                onClick: () => handleEdit(row.original.id),
              },
              {
                id: "eliminar",
                label: "Eliminar",
                icon: <DeleteIcon />,
                onClick: () => handleDelete(row.original.id),
              },
            ]}
          />
        ),
      },
    ],
    [handleEdit, handleDelete]
  );

  const table = useReactTable({
    data: invoiceData?.result || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <MainLayout>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" component="h1">
          Listado de Facturas
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreate}
          startIcon={<AddIcon />}
          sx={{ backgroundColor: "primary" }}
        >
          Nueva Factura
        </Button>
      </Stack>

      <Box py={2}>
        <Filters onSearch={setFilters} />
      </Box>

      {isError ? (
        <Alert severity="error">
          Error al cargar las facturas: {(error as Error).message}
        </Alert>
      ) : (
        <DataTable<Invoice>
          table={table}
          columnsLength={columns.length}
          isLoading={isLoading}
          totalRows={invoiceData?.totalRows || 0}
          rowsPerPage={invoiceData?.rowsPerPage || 0}
          page={invoiceData?.page || 0}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          onSortChange={(columnId, direction) =>
            setSort({ columnId, direction })
          }
          sort={sort}
        />
      )}

      <Modal
        open={open}
        title="Eliminar"
        onClose={() => setOpen(false)}
        actions={
          <Button onClick={confirmDelete} color="error" variant="contained">
            Eliminar
          </Button>
        }
      >
        <Typography>¿Estas seguro de eliminar la factura?</Typography>
      </Modal>
    </MainLayout>
  );
};

export default InvoiceListPage;
