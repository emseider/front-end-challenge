import React, { memo } from "react";
import { Typography, Avatar, Box } from "@mui/material";

interface ClientProps {
  name: string;
  invoiceNumber: string;
  color?: string;
}

const Client: React.FC<ClientProps> = ({
  name,
  invoiceNumber,
  color = "gray",
}) => {
  const initial = name.charAt(0).toUpperCase();

  return (
    <Box display="flex" alignItems="center">
      <Avatar
        sx={{
          backgroundColor: color,
        }}
      >
        {initial}
      </Avatar>
      <Box ml={2}>
        <Typography fontSize={14}>{name}</Typography>
        <Typography fontSize={12} color="textSecondary">
          {invoiceNumber}
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(Client);
