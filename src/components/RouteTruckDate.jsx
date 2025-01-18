import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  TextField,
  Autocomplete,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  InfoWindow,
} from "@react-google-maps/api";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const center = { lat: -33.3248711, lng: -70.7148675 };
const customIcon = "/icons8truck.gif";

const Flex = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
  position: "relative",
}));

const AbsoluteBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 150,
  top: 100,
  height: "80%",
  width: "75%",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(1),
  backgroundColor: "lightgrey",
  boxShadow: theme.shadows[1],
  minWidth: theme.breakpoints.values.md,
  zIndex: 1,
}));

function RouteTruckDate() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [customMarkers, setCustomMarkers] = useState([]);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [trucks, setTrucks] = useState([]);
  const [selectedTruckPatent, setSelectedTruckPatent] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMarker, setSelectedMarker] = useState(null);

  const markerRefs = useRef([]);
  const infoWindowRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/trucks")
      .then((response) => {
        setTrucks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching trucks:", error);
      });
  }, []);

  const handleDateChange = (event) => {
    const inputDate = event.target.value;
    setSelectedDate(inputDate);
  };

  async function calculateRoute() {
    if (!selectedTruckPatent || !selectedDate) {
      return;
    }

    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-\d{4}$/;
    if (!selectedDate.match(dateRegex)) {
      alert("Por favor, ingrese una fecha válida en el formato dd-MM-yyyy.");
      return;
    }

    const formattedDate = selectedDate.split("-").reverse().join("-");
    /*const formattedDate = moment(selectedDate, "DD-MM-YYYY").format(
      "yyyy-MM-dd"
    ); */
    clearMarkers();

    const response = await axios.get(
      "http://localhost:8080/api/routedriver/coordinates",
      {
        params: {
          truckPatent: selectedTruckPatent,
          date: formattedDate,
        },
      }
    );

    const coordinates = response.data;
    const filteredMarkers = coordinates.map((coord) => ({
      lat: coord.addressLatitude,
      lng: coord.addressLongitude,
      id: coord.id,
      icon: getCustomIcon(coord.status),
      addressDescription: coord.addressDescription,
      addressAlias: coord.addressAlias,
      status: coord.status,
    }));

    setMarkers(filteredMarkers);
    setCustomMarkers(filteredMarkers);

    if (filteredMarkers.length > 0) {
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: {
          lat: filteredMarkers[0].lat,
          lng: filteredMarkers[0].lng,
        },
        destination: {
          lat: filteredMarkers[filteredMarkers.length - 1].lat,
          lng: filteredMarkers[filteredMarkers.length - 1].lng,
        },
        waypoints: filteredMarkers.slice(1, -1).map(({ lat, lng }) => ({
          location: { lat, lng },
          stopover: true,
        })),
        travelMode: google.maps.TravelMode.DRIVING,
      });

      setDirectionsResponse(results);

      filteredMarkers.forEach((marker) => {
        const markerInstance = new window.google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          icon: getCustomIcon(marker.status),
          map: map,
        });
        markerInstance.addListener("click", () => {
          if (infoWindowRef.current) {
            infoWindowRef.current.close();
          }
          const newInfoWindow = new window.google.maps.InfoWindow({
            content: `
              <div>
                <h3>${marker.addressDescription}</h3>
                <p>Alias: ${marker.addressAlias}</p>
                <p>Latitud: ${marker.lat}</p>
                <p>Longitud: ${marker.lng}</p>
                <strong>Estatus: ${marker.status}</strong>
              </div>
            `,
          });
          infoWindowRef.current = newInfoWindow; // Set the new InfoWindow reference
          infoWindowRef.current.open(map, markerInstance);
        });
        markerRefs.current.push(markerInstance);
      });
    }
  }

  function getCustomIcon(status) {
    switch (status) {
      case "Realizado":
        return "/realizado.gif";
      case "No Realizado":
        return "/liberty.png";
      case "Parcial":
        return "/parcial.png";
      case "Rechazado":
        return "/furgon.png";
      default:
        return customIcon;
    }
  }

  function clearMarkers() {
    if (markerRefs.current) {
      markerRefs.current.forEach((marker) => marker.setMap(null));
    }
    markerRefs.current = [];
  }

  function clearRoute() {
    clearMarkers();
    setDirectionsResponse(null);
    setMarkers([]);
    setCustomMarkers([]);
    if (infoWindowRef.current) {
      infoWindowRef.current.close();
    }
  }

  function onMapLoad(mapInstance) {
    setMap(mapInstance);
    clearMarkers();
  }

  return (
    <Flex>
      <AbsoluteBox>
        <GoogleMap
          center={center}
          zoom={12}
          mapContainerStyle={{ width: "100%", height: "80%" }}
          options={{
            zoomControl: true,
            streetViewControl: true,
            mapTypeControl: true,
            fullscreenControl: true,
          }}
          onLoad={onMapLoad}
        >
          {customMarkers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={marker.icon}
              onLoad={(markerInstance) => {
                markerRefs.current.push(markerInstance);
              }}
              onClick={() => setSelectedMarker(marker)}
            />
          ))}

          {directionsResponse && (
            <DirectionsRenderer
              directions={directionsResponse}
              options={{
                suppressMarkers: true,
              }}
            />
          )}
        </GoogleMap>
      </AbsoluteBox>
      <StyledBox>
        <Box
          display="flex"
          justifyContent="space-between"
          gap={2}
        >
          <Autocomplete
            options={Array.isArray(trucks) ? trucks : []}
            getOptionLabel={(option) => option.truckPatent}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(event, value) =>
              setSelectedTruckPatent(value ? value.truckPatent : null)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Truck"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <TextField
            label="Input Date"
            type="text"
            value={selectedDate}
            onChange={handleDateChange}
            placeholder="dd-MM-yyyy"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            fullWidth
          />

          <Box
            display="flex"
            justifyContent="space-between"
            gap={2}
            mt={1}
          >
            <ButtonGroup>
              <Button
                color="primary"
                variant="contained"
                onClick={calculateRoute}
              >
                Route
              </Button>
              <IconButton
                aria-label="centrar mapa"
                onClick={() => {
                  map.panTo(center);
                  map.setZoom(12);
                }}
              >
                <FaLocationArrow />
              </IconButton>
              <IconButton
                aria-label="borrar ruta"
                onClick={clearRoute}
              >
                <FaTimes />
              </IconButton>
            </ButtonGroup>
          </Box>
        </Box>
      </StyledBox>
    </Flex>
  );
}

export default RouteTruckDate;
