import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const customIcon = "/icons8truck.gif";

const ShowMapDestinations = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isLoaded, setIsloaded] = useState(true);
  const [directions, setDirections] = useState(null);
  const [center, setCenter] = useState({ lat: -33.3242301, lng: -70.7147924 }); // default center

  useEffect(() => {
    // Función para obtener datos de la base de datos
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/routedriver/coordinates"
        );
        setMarkers(response.data);
        console.log(response.data);
        setIsloaded(true);

        if (response.data.length > 0) {
          // Set the map center to the first marker's location
          setCenter({
            lat: response.data[0].addressLatitude,
            lng: response.data[0].addressLongitude,
          });
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const fetchDirections = () => {
    if (markers.length > 1) {
      const waypoints = markers.slice(1, -1).map((marker) => ({
        location: { lat: marker.addressLatitude, lng: marker.addressLongitude },
        stopover: true,
      }));

      const origin = {
        lat: markers[0].addressLatitude,
        lng: markers[0].addressLongitude,
      };
      const destination = origin; // Set the destination to be the same as the origin for a loop

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          waypoints,
          travelMode: "DRIVING",
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  };

  useEffect(() => {
    fetchDirections();
  }, [markers]);

  if (!isLoaded) {
    return <div>Cargando el mapa...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
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
          options={{ pixelOffset: new window.google.maps.Size(0, -40) }} // Adjust position of InfoWindow
        >
          <div>
            <h3>{selectedMarker.addressDescription}</h3>
            <p>Alias: {selectedMarker.addressAlias}</p>
            <p>Latitud: {selectedMarker.addressLatitude}</p>
            <p>Longitud: {selectedMarker.addressLongitude}</p>
          </div>
        </InfoWindow>
      )}

      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{ suppressMarkers: true }}
        />
      )}
    </GoogleMap>
  );
};

export default ShowMapDestinations;
