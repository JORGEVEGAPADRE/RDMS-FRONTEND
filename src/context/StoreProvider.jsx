import { createContext, useState, useEffect, useCallback } from "react";
//import { listTrucks } from "../services/TruckService";
//import { listDestinations } from "../services/DestinationService";
import {
  createTruck,
  updateTruck,
  deleteTruck,
  listTrucks,
} from "../services/TruckService";
import {
  createDestination,
  updateDestination,
  deleteDestination,
  listDestinations,
} from "../services/DestinationService";

import {
  createDelivery,
  updateDelivery,
  deleteDelivery,
  listDeliveries,
} from "../services/DeliveryService";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [trucks, setTrucks] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [open, setOpen] = useState(true);

  const handleSelect = (component) => {
    setSelectedComponent(component);
  };

  useEffect(() => {
    getAllTrucks();
    getAllDestinations();
  }, []);

  /*
  const updateTruckWrapper = async (id, data) => {
    updateTruck(id, data);
    getAllTrucks();
  };

  const deleteTruckWrapper = async (id) => {
    deleteTruck(id);
    getAllTrucks();
  };
  */

  const getAllTrucks = () => {
    listTrucks()
      .then((response) => {
        setTrucks(response.data.sort((a, b) => b.id - a.id)); // Ordenar en orden descendente
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getAllDestinations = () => {
    listDestinations()
      .then((response) => {
        setDestinations(response.data.sort((a, b) => b.id - a.id)); // Ordenar en orden descendente
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getAllDeliveries = () => {
    listDeliveries()
      .then((response) => {
        setDeliveries(response.data.sort((a, b) => b.id - a.id)); // Ordenar en orden descendente
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <StoreContext.Provider
      value={{
        trucks,
        destinations,
        setTrucks,
        setDestinations,
        getAllTrucks,
        getAllDestinations,
        handleSelect,
        selectedComponent,
        createDestination,
        updateDestination,
        deleteDestination,
        createTruck,
        updateTruck,
        deleteTruck,
        open,
        setOpen,
        deliveries,
        setDeliveries,
        getAllDeliveries,
        createDelivery,
        updateDelivery,
        deleteDelivery,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
