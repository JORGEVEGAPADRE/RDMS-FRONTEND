// ModalForm.jsx
import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useSnackbar } from "notistack";

import {
  createDestination,
  updateDestination,
  deleteDestination,
} from "../services/DestinationService";
import useStore from "../hooks/useStore";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const CRUDDestinations = ({ open, handleClose, operation, currentData }) => {
  const [formData, setFormData] = useState({
    addressDescription: "",
    addressAlias: "",
    addressLatitude: "",
    addressLongitude: "",
  });

  const [errors, setErrors] = useState({ addressDescription: false });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const { destinations, setDestinations, getAllDestinations } = useStore();

  useEffect(() => {
    if (operation === "Add") {
      setFormData({
        addressDescription: "",
        addressAlias: "",
        addressLatitude: "",
        addressLongitude: "",
      });
    } else if (currentData) {
      setFormData({
        addressDescription: currentData.addressDescription || "",
        addressAlias: currentData.addressAlias || "",
        addressLatitude: currentData.addressLatitude || "",
        addressLongitude: currentData.addressLongitude || "",
      });
    }
  }, [currentData, operation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (name === "addressDescription") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        addressDescription: value.trim() === "",
      }));
    }
  };

  const cleanPropertiesFormData = () => {
    return setFormData({
      addressDescription: "",
      addressAlias: "",
      addressLatitude: "",
      addressLongitude: "",
    });
  };

  const handleSubmit = (e) => {
    // Lógica para manejar las operaciones de añadir, modificar o eliminar

    e.preventDefault();

    if (operation === "Add") {
      createDestination(formData)
        .then((response) => {
          console.log("Added destination:", response.data);
          enqueueSnackbar("Destino añadido exitosamente", {
            variant: "success",
          });
          getAllDestinations();
          cleanPropertiesFormData();
        })
        .catch((error) => {
          console.error("Error adding destination:", error);
          enqueueSnackbar("Error: No se pudo completar la operacion", {
            variant: "error",
          });
        });
    } else if (operation === "Edit") {
      updateDestination(currentData.id, formData)
        .then((response) => {
          console.log("Updated destination:", response.data);
          enqueueSnackbar("Destino editado exitosamente", {
            variant: "success",
          });
          getAllDestinations();
          cleanPropertiesFormData();
        })
        .catch((error) => {
          console.error("Error updating destination:", error);
          enqueueSnackbar("Error: No se pudo completar la operacion", {
            variant: "error",
          });
        });
    } else if (operation === "Delete") {
      deleteDestination(currentData.id)
        .then((response) => {
          console.log("Deleted destination:", response.data);
          enqueueSnackbar("Destino eliminado exitosamente", {
            variant: "success",
          });

          getAllDestinations();
          cleanPropertiesFormData();
        })

        .catch((error) => {
          console.error("Error deleting destination:", error);
          enqueueSnackbar("Error: No se pudo completar la operacion", {
            variant: "error",
          });
        });
    }
    cleanPropertiesFormData();
    getAllDestinations();
    handleClose();
  };

  const handleSnackbarClose = () => {
    cleanPropertiesFormData();
    setSnackbarOpen(false);
  };
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={modalStyle}>
        <Typography
          variant="h6"
          component="h2"
          align="center"
          sx={{ mb: 2 }}
        >
          {operation} Destination
        </Typography>
        <TextField
          isrequired="true"
          sx={{ width: "100%" }}
          id="addressDescription"
          name="addressDescription"
          value={formData.addressDescription}
          label={"Address Description"}
          type="text"
          variant="standard"
          disabled={operation === "Delete"}
          onChange={handleChange}
          error={errors.addressDescription}
          helperText={
            errors.addressDescription ? "La Patente es requerida" : ""
          }
        />

        <TextField
          isrequired="true"
          sx={{ width: "100%" }}
          id="addressAlias"
          name="addressAlias"
          value={formData.addressAlias}
          label={"Address Alias"}
          type="text"
          variant="standard"
          disabled={operation === "Delete"}
          onChange={handleChange}
        />

        <TextField
          isrequired="true"
          sx={{ width: "100%" }}
          id="addressLatitude"
          name="addressLatitude"
          value={formData.addressLatitude}
          label={"Latitude"}
          type="text"
          variant="standard"
          disabled={operation === "Delete"}
          onChange={handleChange}
        />

        <TextField
          isrequired="true"
          sx={{ width: "100%" }}
          id="addressLongitude"
          name="addressLongitude"
          value={formData.addressLongitude}
          label={"Longitude"}
          type="text"
          variant="standard"
          disabled={operation === "Delete"}
          onChange={handleChange}
        />
        <Button
          disabled={formData.addressDescription.trim === ""}
          variant="contained"
          color={operation === "Delete" ? "error" : "primary"}
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          {operation}
        </Button>
      </Box>
    </Modal>
  );
};

export default CRUDDestinations;
