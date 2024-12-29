// ModalForm.jsx
import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useSnackbar } from "notistack";

import {
  createTruck,
  updateTruck,
  deleteTruck,
} from "../services/TruckService";
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

const CRUDTrucks = ({ open, handleClose, operation, currentData }) => {
  const [formData, setFormData] = useState({
    truckPatent: "",
    truckCapacity: "",
    truckService: "",
    truckType: "",
  });

  const [errors, setErrors] = useState({ truckPatent: false });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const { trucks, setTrucks, getAllTrucks } = useStore();

  useEffect(() => {
    if (operation === "Add") {
      setFormData({
        truckPatent: "",
        truckCapacity: "",
        truckService: "",
        trucktType: "",
      });
    } else if (currentData) {
      setFormData({
        truckPatent: currentData.truckPatent || "",
        truckCapacity: currentData.truckCapacity || "",
        truckService: currentData.truckService || "",
        truckType: currentData.truckType || "",
      });
    }
  }, [currentData, operation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (name === "truckPatent") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        truckPatent: value.trim() === "",
      }));
    }
  };

  const cleanPropertiesFormData = () => {
    return setFormData({
      truckPatent: "",
      truckCapacity: "",
      truckService: "",
      trucktType: "",
    });
  };

  const handleSubmit = (e) => {
    // Lógica para manejar las operaciones de añadir, modificar o eliminar

    e.preventDefault();

    if (operation === "Add") {
      createTruck(formData)
        .then((response) => {
          console.log("Added truck:", response.data);
          enqueueSnackbar("Camión añadido exitosamente", {
            variant: "success",
          });
          cleanPropertiesFormData();
          getAllTrucks();
        })
        .catch((error) => {
          console.error("Error adding truck:", error);
          enqueueSnackbar("Error: No se pudo completar la operacion", {
            variant: "error",
          });
          cleanPropertiesFormData();
          setSnackbarOpen(true);
        });
    } else if (operation === "Edit") {
      updateTruck(currentData.id, formData)
        .then((response) => {
          // setTrucks(response.data);
          console.log("Updated truck:", response.data);
          enqueueSnackbar("Camión editado exitosamente", {
            variant: "success",
          });
          cleanPropertiesFormData();
          getAllTrucks();
        })
        .catch((error) => {
          console.error("Error updating truck:", error);
          enqueueSnackbar("Error: No se pudo completar la operacion", {
            variant: "error",
          });
          cleanPropertiesFormData();
        });
    } else if (operation === "Delete") {
      deleteTruck(currentData.id)
        .then((response) => {
          // setTrucks(response.data);
          console.log("Deleted truck:", response.data);
          enqueueSnackbar("Camión eliminado exitosamente", {
            variant: "success",
          });
          cleanPropertiesFormData();
          getAllTrucks();
        })

        .catch((error) => {
          console.error("Error deleting truck:", error);
          enqueueSnackbar("Error: No se pudo completar la operacion", {
            variant: "error",
          });
          cleanPropertiesFormData();
        });
    }
    cleanPropertiesFormData();
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
          {operation} Truck
        </Typography>
        <TextField
          isrequired="true"
          sx={{ width: "100%" }}
          id="truckPatent"
          name="truckPatent"
          value={formData.truckPatent}
          label={"Truck Patent"}
          type="text"
          variant="standard"
          disabled={operation === "Delete"}
          onChange={handleChange}
          error={errors.truckPatent}
          helperText={errors.truckPatent ? "La Patente es requerida" : ""}
        />

        <TextField
          isrequired="true"
          sx={{ width: "100%" }}
          id="truckCapacity"
          name="truckCapacity"
          value={formData.truckCapacity}
          label={"Truck Capacity"}
          type="text"
          variant="standard"
          disabled={operation === "Delete"}
          onChange={handleChange}
        />

        <TextField
          isrequired="true"
          sx={{ width: "100%" }}
          id="truckService"
          name="truckService"
          value={formData.truckService}
          label={"Truck Service"}
          type="text"
          variant="standard"
          disabled={operation === "Delete"}
          onChange={handleChange}
        />

        <TextField
          isrequired="true"
          sx={{ width: "100%" }}
          id="truckType"
          name="truckType"
          value={formData.truckType}
          label={"Truck Type"}
          type="text"
          variant="standard"
          disabled={operation === "Delete"}
          onChange={handleChange}
        />
        <Button
          disabled={formData.truckPatent.trim === ""}
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

export default CRUDTrucks;
