import React from "react";
import { Container } from "@mui/material";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Container
      sx={{
        p: 2,
        backgroundColor: "background.paper",
        width: "90%",
        textAlign: "left",
      }}
    >
      {children}
    </Container>
  );
};

export default MainLayout;
