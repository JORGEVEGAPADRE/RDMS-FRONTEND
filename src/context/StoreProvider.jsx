import { createContext, useState, useEffect } from "react";
//import { deleteTruck, listTrucks } from "../services/TruckService";
import { listTrucks } from "../services/TruckService";
import { listDestinations } from "../services/DestinationService";
const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [trucks, setTrucks] = useState([]);
  const [destinations, setDestinations] = useState([]);
  // const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleSelect = (component) => {
    setSelectedComponent(component);
  };

  useEffect(() => {
    getAllTrucks();
    getAllDestinations();
  }, []);

  function getAllTrucks() {
    listTrucks()
      .then((response) => {
        setTrucks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getAllDestinations() {
    listDestinations()
      .then((response) => {
        setDestinations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <StoreContext.Provider
      value={{
        trucks,
        destinations,
        setTrucks,
        getAllTrucks,
        getAllDestinations,
        //setSelectedRowIds,
        handleSelect,
        selectedComponent,
        open,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider };
export default StoreContext;
