//import useStore from "../hooks/useStore";
import * as React from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";

const desCad = [
  "Mis Pensamientos",
  "Contactame",
  "Mis Experiencias Laborales",
  "Mi Preparacion Academica",
  "Mis Habilidades",
  "Los Idiomas que Manejo",
  "Mis Hobbies",
];

const desCadEnglish = [
  "My Thoughts",
  "Contact Me",
  "My Experience",
  "My Academic Degrees",
  "My Skills",
  "My Languages",
  "Mis Hobbies",
];

function Post() {
  return (
    <React.Fragment>
      <Card sx={{ margin: 5 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: "red" }}
              aria-label="recipe"
            ></Avatar>
          }
        />
        <CardMedia
          component="img"
          height="20%"
          image={`/img/pepe.jpeg`}
          alt="Imagen No Encontrada"
        />
        <CardContent>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontWeight: "bold", fontStyle: "oblique", m: 1 }}
          ></Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontWeight: "bold", fontStyle: "oblique", m: 1 }}
          ></Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          ></Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          ></Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          ></Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default Post;
