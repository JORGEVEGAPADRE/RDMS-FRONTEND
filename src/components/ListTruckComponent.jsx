import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import ReusableDataTable from "./ReusableDataTable";
import CRUDModal from "./CRUDModal";
import StoreContext from "../context/StoreProvider";
//import { Propane } from "@mui/icons-material";
//import {
// createTruck,
//  updateTruck,
//  deleteTruck,
//} from "../services/TruckService";

const ListTruckComponent = ({
  open,
  handleClose,
  operation,
  currentData,
  handleOpenModal,
}) => {
  const { trucks, getAllTrucks, createTruck, updateTruck, deleteTruck } =
    useContext(StoreContext);

  useEffect(() => {
    getAllTrucks();
  }, []);

  const columns = [
    { name: "id", label: "ID", options: { filter: true, sort: true } },
    {
      name: "truckPatent",
      label: "Truck Patent",
      options: { filter: true, sort: true },
    },
    {
      name: "truckCapacity",
      label: "Truck Capacity",
      options: { filter: true, sort: true },
    },
    {
      name: "truckService",
      label: "Truck Service",
      options: { filter: true, sort: true },
    },
    {
      name: "truckType",
      label: "Truck Type",
      options: { filter: true, sort: true },
    },
    {
      name: "acciones",
      label: "Actions",
      options: { filter: false, sort: false },
    },
  ];

  const fields = [
    { name: "truckPatent", label: "Truck Patent", required: true },
    { name: "truckCapacity", label: "Truck Capacity", required: true },
    { name: "truckService", label: "Truck Service", required: true },
    { name: "truckType", label: "Truck Type", required: true },
  ];

  return (
    <>
      <ReusableDataTable
        title="Truck"
        data={trucks}
        columns={columns}
        fields={fields}
        handleOpenModal={handleOpenModal}
        createEntity={createTruck}
        updateEntity={updateTruck}
        deleteEntity={deleteTruck}
        getAllEntities={getAllTrucks}
      />
      <CRUDModal
        entityType="truck"
        open={open}
        handleClose={handleClose}
        operation={operation}
        currentData={currentData}
        fields={fields}
        createEntity={createTruck}
        updateEntity={updateTruck}
        deleteEntity={deleteTruck}
        getAllEntities={getAllTrucks}
      />
    </>
  );
};

ListTruckComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  operation: PropTypes.string,
  currentData: PropTypes.object,
  handleOpenModal: PropTypes.func.isRequired,
  entityType: PropTypes.string,
  getAllEntities: PropTypes.func.isRequired,
};

export default ListTruckComponent;
