import { render } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CssBaseline } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import App from "./App";
import { queryClient } from "./config/query.config";
import { theme } from "./config/theme.config";

describe("App component", () => {
  it("renders without crashing", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssBaseline />
            <App />
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssBaseline />
            <App />
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
