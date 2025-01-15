import React from "react";
import { Box, Typography, Container, Link } from "@mui/material";


const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#3f51b5",
        color: "white",
        textAlign: "center",
        width: "100%", // Asegúrate de que el footer ocupe todo el ancho
        position: "sticky", // Manténlo posicionado correctamente
        bottom: 0, // Posiciónalo en la parte inferior
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          © 2025, VegaSoft Corporation. All Rights Reserved
        </Typography>
        
      </Container>
    </Box>
  );
};

export default Footer;
