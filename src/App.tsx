import { ThemeProvider } from "@emotion/react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CssBaseline } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";

import AppRoutes from "./App.routes";
import { queryClient } from "./config/query.config";
import { theme } from "./config/theme.config";
import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <AppRoutes />
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
