import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
//import useStore from "../hooks/useStore";

import {
  Avatar,
  AvatarGroup,
  Box,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  Stack,
} from "@mui/material";
import React from "react";

const Rightbar = () => {
  const handleClickRedirect = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Box
      width={350}
      pt={2}
      sx={{
        display: { xs: "block", sm: "block" },
      }}
    >
      <Box
        position="fixed"
        p={2}
      >
        <Stack
          spacing={1}
          marginTop={2}
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h8"
            marginBottom={2}
          >
            Mi Familia...
          </Typography>

          <AvatarGroup max={7}>
            <Avatar
              alt="Sara Elizabeth"
              src="img/SaraBaby.jpeg"
            />
            <Avatar
              alt="Sara Esposa"
              src="img/SaraEsposa.jpeg"
            />

            <Avatar
              alt="Elizabeth Madre"
              src="img/Elizabeth.jpeg"
            />

            <Avatar
              alt="Jorge Isaac"
              src="img/Jorgei.jpeg"
            />
            <Avatar
              alt="Angel Gabriel"
              src="img/AngelG.jpeg"
            />

            <Avatar
              alt="Enmanuel David"
              src="img/EnmanuelDavid2.jpeg"
            />
          </AvatarGroup>
        </Stack>

        <Stack>
          <Typography
            marginTop={2}
            marginBottom={2}
            variant="h8"
            textAlign="center"
          >
            Acerca de mi...
          </Typography>

          <Card
            sx={{
              border: "rounded",
              boxShadow: 4,
              width: "100%",
              margin: "auto",
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: "red" }}
                  aria-label="recipe"
                >
                  JV
                </Avatar>
              }
              title="Jorge Vega"
              subheader={"Quien soy Yo?. En Mis Palabras..."}
            />
          </Card>
        </Stack>

        <br />
        <Stack
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h8">Redes Sociales/Repositorio...</Typography>

          <Stack
            direction={"row"}
            spacing={0.3}
            paddingLeft={2}
          >
            <FacebookIcon
              color="primary"
              fontSize="large"
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleClickRedirect(
                  "https://www.facebook.com/profile.php?id=61554029878752"
                )
              }
            />

            <LinkedInIcon
              color="primary"
              fontSize="large"
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleClickRedirect("https://www.linkedin.com/in/jorgevegadev/")
              }
            />
            <WhatsAppIcon
              onClick={() => handleClickRedirect("https://wa.link/105fb8")}
              style={{ color: "green", fontSize: 35, cursor: "pointer" }}
            />

            <GitHubIcon
              onClick={() =>
                handleClickRedirect("https://github.com/JORGEVEGAPADRE")
              }
              style={{ color: "red", fontSize: 35, cursor: "pointer" }}
            />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Rightbar;
