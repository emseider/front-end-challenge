import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "./filters";
import { vi } from "vitest";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

describe("Filters component", () => {
  const onSearchMock = vi.fn();

  beforeEach(() => {
    onSearchMock.mockClear();
  });

  const renderWithLocalization = (ui: React.ReactElement) => {
    return render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {ui}
      </LocalizationProvider>
    );
  };

  test("resets searchTerm and calls onSearch when searchTerm is cleared", () => {
    renderWithLocalization(<Filters onSearch={onSearchMock} />);

    fireEvent.change(
      screen.getByLabelText(/Buscar por cliente o numero de factura/i),
      {
        target: { value: "test search" },
      }
    );

    fireEvent.change(
      screen.getByLabelText(/Buscar por cliente o numero de factura/i),
      {
        target: { value: "" },
      }
    );

    expect(onSearchMock).toHaveBeenCalledWith({
      status: "",
      startDate: dayjs().startOf("day"),
      endDate: dayjs().endOf("day"),
      searchTerm: "",
    });
  });
});
