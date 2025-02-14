import React, { useMemo } from "react";
import Chip from "@mui/material/Chip";
import { StatusEnum } from "../../types";

interface StatusProps {
  status: StatusEnum | string;
}

const Status: React.FC<StatusProps> = ({ status }) => {
  const color = useMemo(() => {
    switch (status) {
      case StatusEnum.Paid:
        return "success";
      case StatusEnum.Pending:
        return "warning";
      case StatusEnum.Overdue:
        return "error";
      default:
        return "default";
    }
  }, [status]);

  const label = useMemo(() => {
    switch (status) {
      case StatusEnum.Paid:
        return "Pagado";
      case StatusEnum.Pending:
        return "Pendente";
      case StatusEnum.Overdue:
        return "Vencido";
      default:
        return status;
    }
  }, [status]);

  return <Chip label={label} color={color} />;
};

export default Status;
