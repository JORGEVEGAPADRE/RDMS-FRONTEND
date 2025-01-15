import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";
import { styled } from "@mui/system";
import { Box } from "@mui/material";

//import { InfoWindow } from "@vis.gl/react-google-maps";

const containerStyle = {
  width: "100%",
  height: "550px",
};

const center = {
  lat: -33.4489,
  lng: -70.6693,
};

const customIcon = "/realizado.gif";

const AbsoluteBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 350,
  top: 100,
  height: "100%",
  width: "75%",
}));

const ShowMapDestinations = () => {
  /*
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyC_I64xbjZuGBnd369LrvZXQkfoS3zglvg",
  }); */

  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isLoaded, setIsloaded] = useState(true);

  useEffect(() => {
    // Función para obtener datos de la base de datos
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/destinations"
        ); // Ajusta la URL según tu backend
        setMarkers(response.data);
        console.log(response.data);
        setIsloaded(true);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  if (!isLoaded) {
    return <div>Cargando el mapa...</div>;
  }

  return (
    <AbsoluteBox>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={{
          zoomControl: true,
          streetViewControl: true,
          mapTypeControl: true,
          fullscreenControl: true,
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            icon={customIcon}
            key={index}
            position={{
              lat: marker.addressLatitude,
              lng: marker.addressLongitude,
            }}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.addressLatitude,
              lng: selectedMarker.addressLongitude,
            }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h3>{selectedMarker.addressDescription}</h3>{" "}
              <p>Alias: {selectedMarker.addressAlias}</p>
              <p>Latitud: {selectedMarker.addressLatitude}</p>
              <p>Longitud: {selectedMarker.addressLongitude}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </AbsoluteBox>
  );
};

export default ShowMapDestinations;
