import { useState, useEffect, useRef, useContext } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import moment from "moment";

import { Autocomplete } from "@react-google-maps/api";

import { Stack } from "@mui/material";
import { CgChevronDoubleLeft } from "react-icons/cg";
import StoreContext from "../context/StoreProvider";

import { Close as CloseIcon } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";

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

const CRUDModal = ({
  open,
  setOpen,
  handleOpen,
  handleClose,
  operation,
  currentData,
  entityType,
  fields,
  createEntity,
  updateEntity,
  deleteEntity,
  getAllEntities,
}) => {
  const initialFormData = fields.reduce(
    (acc, field) => ({ ...acc, [field.name]: "" }),
    {}
  );
  const [selectedTruckId, setSelectedTruckId] = useState("");
  const [selectedDestinationId, setSelectedDestinationId] = useState("");
  const [selectedTruckPatent, setSelectedTruckPatent] = useState(null);
  const { trucks, getAllTrucks } = useContext(StoreContext);
  const { destinations, getAllDestinations } = useContext(StoreContext);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [originLatLng, setOriginLatLng] = useState({ lat: "", lng: "" });
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  const [opc, setOpc] = useState(0);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getAllTrucks();
    getAllDestinations();
    if (open) {
      if (operation === "Add") {
        setFormData(initialFormData);
      } else if (operation !== "Add" && currentData) {
        setFormData(
          fields.reduce(
            (acc, field) => ({
              ...acc,
              [field.name]: currentData[field.name] || "",
            }),
            {}
          )
        );
      }
    }
  }, [open]);

  const handleChange = (e, opc) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (opc === 1) {
      calculateCoordinates();
    }
  };

  const handleTruckChange = (e) => {
    const selectedId = e.target.value;
    setSelectedTruckId(selectedId);
    setFormData((prevFormData) => ({
      ...prevFormData,
      truckId: selectedId,
    }));
  };

  const handleDestinationChange = (e) => {
    const selectedDestinationId = e.target.value;
    setSelectedDestinationId(selectedDestinationId);
    setFormData((prevFormData) => ({
      ...prevFormData,
      destinationId: selectedDestinationId,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que todos los campos requeridos estén completos
    const missingFields = fields.filter(
      (field) => field.required && !formData[field.name]
    );
    if (missingFields.length > 0) {
      // Mostrar alert o snackbar para informar al usuario
      enqueueSnackbar("Please, complete all required fields.", {
        variant: "warning",
      });
      return;
    }

    // Formatear la fecha antes de enviar el formulario
    const formattedFormData = { ...formData };

    if (formattedFormData.deliveryDate) {
      formattedFormData.deliveryDate = moment(
        formattedFormData.deliveryDate,
        "DD-MM-YYYY"
      ).format("YYYY-MM-DD");
    }

    if (operation === "Add") {
      createEntity(formattedFormData)
        .then(() => {
          enqueueSnackbar("Add successfully !!!", {
            variant: "success",
          });
          getAllEntities();
          handleClose();
          console.log("entidad" + formData);
          setFormData(initialFormData);
        })
        .catch(() => {
          enqueueSnackbar("Error: The operation could not be completed..!!!", {
            variant: "error",
          });
        });
    } else if (operation === "Edit") {
      updateEntity(currentData.id, formData)
        .then(() => {
          enqueueSnackbar("Edit successfully !!!", {
            variant: "success",
          });
          getAllEntities();
          handleClose();
          setFormData(initialFormData);
        })
        .catch(() => {
          enqueueSnackbar("Error: The operation could not be completed..!!!", {
            variant: "error",
          });
        });
    } else if (operation === "Delete") {
      deleteEntity(currentData.id)
        .then(() => {
          enqueueSnackbar("Delete successfully !!!", {
            variant: "success",
          });
          getAllEntities();
          handleClose();
          setFormData(initialFormData);
        })
        .catch(() => {
          enqueueSnackbar("Error: The operation could not be completed..!!!", {
            variant: "error",
          });
        });
    }
  };

  async function calculateCoordinates() {
    if (originRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const origin = originRef.current.value;
    const destination = originRef.current.value;

    try {
      const results = await directionsService.route({
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirectionsResponse(results);
      setOriginLatLng({
        lat: results.routes[0].legs[0].start_location.lat(),
        lng: results.routes[0].legs[0].start_location.lng(),
      });
      setFormData((prevFormData) => ({
        ...prevFormData,
        ["addressLatitude"]: results.routes[0].legs[0].start_location.lat(),
        ["addressLongitude"]: results.routes[0].legs[0].start_location.lng(),
      }));
      setLatitude(results.routes[0].legs[0].start_location.lat());
      setLongitude(results.routes[0].legs[0].start_location.lng());
      console.log(formData);
      console.log(latitude);
      console.log(longitude);
    } catch (error) {
      console.error("Error calculating route:", error);
    }
  }

  function clearCoordinates() {
    setDirectionsResponse(null);
    setOriginLatLng({ lat: "", lng: "" });
    originRef.current.value = "";
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={modalStyle}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="h2"
          align="center"
          sx={{ mb: 2 }}
        >
          {operation}
        </Typography>
        {fields.map((field, index) => {
          if (
            field.name === "addressDescription" &&
            index === 0 &&
            operation !== "Delete"
          ) {
            return (
              <Autocomplete key={field.name}>
                <TextField
                  required={field.required}
                  sx={{ width: "100%", mb: 2 }}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  label={field.label}
                  type="text"
                  variant="standard"
                  disabled={operation === "Delete"}
                  onChange={(e) => handleChange(e, 1)}
                  inputRef={originRef}
                />
              </Autocomplete>
            );
          } else if (field.name === "addressAlias") {
            return (
              <TextField
                key={field.name}
                required={field.required}
                sx={{ width: "100%", mb: 2 }}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                label={field.label}
                type="text"
                variant="standard"
                disabled={operation === "Delete"}
                onChange={(e) => handleChange(e, 0)}
              />
            );
          } else if (
            field.name === "addressLatitude" &&
            operation !== "Delete"
          ) {
            return (
              <TextField
                key={field.name}
                //    required={field.required}
                sx={{ width: "100%", mb: 2 }}
                id={field.name}
                name={field.name}
                value={latitude}
                label={field.label}
                type="text"
                variant="standard"
                disabled={true}
                onChange={(e) => handleChange(e, 1)}
              />
            );
          } else if (
            field.name === "addressLongitude" &&
            operation !== "Delete"
          ) {
            return (
              <TextField
                key={field.name}
                //   required={field.required}
                sx={{ width: "100%", mb: 2 }}
                id={field.name}
                name={field.name}
                value={(field.value = longitude)}
                label={field.label}
                type="text"
                variant="standard"
                disabled={true}
                onChange={(e) => handleChange(e, 1)}
              />
            );
          } else if (field.name === "truckId" && operation !== "Delete") {
            return (
              <TextField
                select
                key={field.name}
                required={field.required}
                sx={{ width: "100%", mb: 2 }}
                id={field.name}
                name={field.name}
                value={selectedTruckId}
                label={field.label}
                variant="standard"
                onChange={handleTruckChange}
                SelectProps={{ native: false }}
              >
                {trucks.map((truck, index) => (
                  <MenuItem
                    key={index}
                    value={truck.id}
                  >
                    {truck.truckPatent}
                  </MenuItem>
                ))}
              </TextField>
            );
          } else if (field.name === "destinationId" && operation !== "Delete") {
            return (
              <TextField
                select
                key={field.name}
                required={field.required}
                sx={{ width: "100%", mb: 2 }}
                id={field.name}
                name={field.name}
                value={selectedDestinationId}
                label={field.label}
                variant="standard"
                onChange={handleDestinationChange}
                SelectProps={{ native: false }}
              >
                {destinations.map((destination, index) => (
                  <MenuItem
                    key={index}
                    value={destination.id}
                  >
                    {destination.addressDescription}
                  </MenuItem>
                ))}
              </TextField>
            );
          } else {
            return (
              <TextField
                key={field.name}
                required={field.required}
                sx={{ width: "100%", mb: 2 }}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                label={field.label}
                type="text"
                variant="standard"
                disabled={operation === "Delete"}
                onChange={(e) => handleChange(e, 0)}
              />
            );
          }
        })}

        <Box>
          <Button
            variant="contained"
            color={operation === "Delete" ? "error" : "primary"}
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            {operation}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

CRUDModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  operation: PropTypes.string,
  currentData: PropTypes.object,
  entityType: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      required: PropTypes.bool,
    })
  ).isRequired,
  createEntity: PropTypes.func.isRequired,
  updateEntity: PropTypes.func.isRequired,
  deleteEntity: PropTypes.func.isRequired,
  getAllEntities: PropTypes.func.isRequired,
};

export default CRUDModal;
