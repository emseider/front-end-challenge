import { IconButton, Typography, Card, Stack } from "@mui/material";
import React, { memo } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

interface CardProps {
  mode: "edit" | "add";
  information?: {
    customerName: string;
    address: string;
    phone: string;
  };
}

const RecipientCard: React.FC<CardProps> = ({ mode = "edit", information }) => {
  return (
    <Card
      sx={{
        height: "100%",
      }}
    >
      <Stack p={2} position="relative" spacing={1}>
        <IconButton
          aria-label="edit"
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          {mode === "edit" ? <EditIcon /> : <AddIcon />}
        </IconButton>
        <Typography
          variant="h6"
          component="h2"
          color="textSecondary"
          fontWeight="bold"
        >
          {mode === "edit" ? "De" : "Para"}:
        </Typography>
        {information && (
          <>
            <Typography variant="body1" fontWeight={600}>
              {information.customerName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {information.address}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {information.phone}
            </Typography>
          </>
        )}
      </Stack>
    </Card>
  );
};

export default memo(RecipientCard);
