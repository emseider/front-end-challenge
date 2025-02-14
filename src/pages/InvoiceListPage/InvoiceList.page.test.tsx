import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import InvoiceListPage from "./InvoiceList.page";
import { vi } from "vitest";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

vi.mock("../../services/invoice.service", () => ({
  searchInvoices: vi.fn().mockResolvedValue({
    result: [],
    totalRows: 0,
    rowsPerPage: 10,
    page: 0,
  }),
  deleteInvoice: vi.fn().mockResolvedValue({}),
  buildFilterQuery: vi.fn(),
}));

const queryClient = new QueryClient();

const renderComponent = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <InvoiceListPage />
        </LocalizationProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );

describe("InvoiceListPage", () => {
  it("renders the page title", () => {
    renderComponent();
    expect(screen.getByText("Listado de Facturas")).toBeInTheDocument();
  });

  it("renders the create invoice button", () => {
    renderComponent();
    expect(screen.getByText("Nueva Factura")).toBeInTheDocument();
  });

  it("opens the create invoice page when the button is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByText("Nueva Factura"));
    expect(window.location.pathname).toBe("/invoices/create");
  });
});
