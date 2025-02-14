import React from "react";
import MainLayout from "../../layouts/MainLayout/main.layout";
import { Box, Stack, Typography } from "@mui/material";
import RecipientCard from "../../components/RecipientCard/recipientCard";

const BreadCrumbs = () => {
  return (
    <Stack direction="row" spacing={1}>
      <Typography variant="body2" color="black">
        Factura
      </Typography>
      <Typography variant="body2" color="textSecondary">
        &gt;
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Nueva factura
      </Typography>
    </Stack>
  );
};

const CreateInvoicePage: React.FC = () => {
  const customerName = "John Doe";
  const address = "1234 Main St, Springfield, IL 62701";
  const phone = "217-555-5555";
  return (
    <MainLayout>
      <Typography variant="h4" component="h1">
        Crear nueva factura
      </Typography>
      <Box py={2}>
        <BreadCrumbs />
      </Box>
      <Stack direction="row" spacing={0}>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <RecipientCard
            mode="edit"
            information={{ customerName, address, phone }}
          />
        </Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <RecipientCard mode="add" />
        </Box>
      </Stack>
      <Stack></Stack>
    </MainLayout>
  );
};

export default CreateInvoicePage;
