import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import { Stack } from "@mui/material";

const center = { lat: -33.3248711, lng: -70.7148675 };

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
  top: 0,
  height: "80%",
  width: "75%",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(2),
  backgroundColor: "white",
  boxShadow: theme.shadows[1],
  minWidth: theme.breakpoints.values.md,
  zIndex: 1,
}));

function DistanceABcomponent() {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [originLatLng, setOriginLatLng] = useState({ lat: "", lng: "" });
  const [destinationLatLng, setDestinationLatLng] = useState({
    lat: "",
    lng: "",
  });

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    setOriginLatLng({
      lat: results.routes[0].legs[0].start_location.lat(),
      lng: results.routes[0].legs[0].start_location.lng(),
    });
    setDestinationLatLng({
      lat: results.routes[0].legs[0].end_location.lat(),
      lng: results.routes[0].legs[0].end_location.lng(),
    });
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    setOriginLatLng({ lat: "", lng: "" });
    setDestinationLatLng({ lat: "", lng: "" });
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  return (
    <Flex>
      <AbsoluteBox>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </AbsoluteBox>
      <StyledBox>
        <Box
          display="flex"
          justifyContent="space-between"
          gap={2}
        >
          <Autocomplete>
            <TextField
              fullWidth
              type="text"
              placeholder="Origin (A)"
              inputRef={originRef}
            />
          </Autocomplete>
          <Autocomplete>
            <TextField
              fullWidth
              type="text"
              placeholder="Destination (B)"
              inputRef={destinationRef}
            />
          </Autocomplete>

          <ButtonGroup>
            <Button
              color="primary"
              variant="contained"
              onClick={calculateRoute}
            >
              Calculate
            </Button>
            <IconButton
              aria-label="center back"
              onClick={() => {
                map.panTo(center);
                map.setZoom(15);
              }}
            >
              <FaLocationArrow />
            </IconButton>
            <IconButton
              aria-label="center back"
              onClick={clearRoute}
            >
              <FaTimes />
            </IconButton>
          </ButtonGroup>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          gap={2}
          mt={4}
        >
          <Stack>
            <Typography>Distance: {distance} </Typography>
            <Typography>Duration: {duration} </Typography>
            <Typography>Origin Latitude: {originLatLng.lat} </Typography>
            <Typography>Origin Longitude: {originLatLng.lng} </Typography>
            <Typography>
              Destination Latitude: {destinationLatLng.lat}
            </Typography>
            <Typography>
              Destination Longitude: {destinationLatLng.lng}
            </Typography>
          </Stack>
        </Box>
      </StyledBox>
    </Flex>
  );
}

export default DistanceABcomponent;
