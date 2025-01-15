// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider } from "react-router-dom";
//import Sidebar from "./components/Sidebar";
import router from "./router";
import { StoreProvider } from "./context/StoreProvider";
import { APIProvider } from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
//import type { Marker } from "@googlemaps/markerclusterer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <APIProvider
        apiKey={"AIzaSyC_I64xbjZuGBnd369LrvZXQkfoS3zglvg"}
        libraries={["places"]}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <RouterProvider router={router}></RouterProvider>
      </APIProvider>
    </StoreProvider>
  </React.StrictMode>
);
