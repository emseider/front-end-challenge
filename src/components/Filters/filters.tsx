import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { type Filter, StatusEnum } from "../../types";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs, { type Dayjs } from "dayjs";

interface FiltersProps {
  onSearch: (filters: Filter) => void;
}

const Filters: React.FC<FiltersProps> = ({ onSearch }) => {
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState<Dayjs>(dayjs().startOf("day"));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs().endOf("day"));
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = () => {
    onSearch({ status, startDate, endDate, searchTerm });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <Box display="flex" flexDirection="row" gap={2}>
        <FormControl fullWidth>
          <InputLabel id="status-label">Estatus</InputLabel>
          <Select
            aria-placeholder="status"
            labelId="status-label"
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusEnum)}
            label="Status"
          >
            {Object.values(StatusEnum).map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel shrink>Fecha de inicio</InputLabel>
          <Box>
            <DesktopDatePicker
              value={dayjs(startDate)}
              onChange={(date) => {
                if (date) {
                  const adjustedDate = date
                    .hour(0)
                    .minute(0)
                    .second(0)
                    .millisecond(0);
                  setStartDate(adjustedDate);
                }
              }}
            />
          </Box>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel shrink>Fecha de fin</InputLabel>
          <Box>
            <DesktopDatePicker
              value={endDate}
              onChange={(date) => {
                if (date) {
                  const adjustedDate = date
                    .hour(23)
                    .minute(59)
                    .second(59)
                    .millisecond(999);
                  setEndDate(adjustedDate);
                }
              }}
            />
          </Box>
        </FormControl>
        <TextField
          label="Buscar por cliente o numero de factura"
          fullWidth
          value={searchTerm}
          onChange={({ target: { value } }) => {
            if (value === "") {
              setSearchTerm("");
              onSearch({ status, startDate, endDate, searchTerm: "" });
            } else {
              setSearchTerm(value);
            }
          }}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ minWidth: "fit-content" }}
        >
          Search
        </Button>
      </Box>
    </form>
  );
};

export default Filters;
