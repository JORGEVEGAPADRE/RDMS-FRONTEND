import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import ReusableDataTable from "./ReusableDataTable";
import CRUDModal from "./CRUDModal";
import StoreContext from "../context/StoreProvider";
//import { Propane } from "@mui/icons-material";
//import {
// createTruck,
//  updateTruck,
//  deleteTruck,
//} from "../services/TruckService";

const RoutesTrucks = ({
  open,
  handleClose,
  operation,
  currentData,
  handleOpenModal,
}) => {
  const {
    deliveries,
    getAllDeliveries,
    createDelivery,
    updateDelivery,
    deleteDelivery,
  } = useContext(StoreContext);

  useEffect(() => {
    getAllDeliveries();
  }, []);

  const columns = [
    { name: "id", label: "ID", options: { filter: true, sort: true } },

    {
      name: "truckId",
      label: "Truck Id",
      options: { filter: true, sort: true },
    },
    {
      name: "truckPatent",
      label: "Truck Patent",
      options: { filter: true, sort: true },
    },
    {
      name: "destinationId",
      label: "Destination Id",
      options: { filter: true, sort: true },
    },
    {
      name: "addressAlias",
      label: "Destination (Alias)",
      options: { filter: true, sort: true },
    },
    {
      name: "deliveryDate",
      label: "Delivery Date",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => moment(value).format("DD-MM-YYYY"),
      },
    },
    {
      name: "acciones",
      label: "Actions",
      options: { filter: false, sort: false },
    },
  ];

  const fields = [
    { name: "truckId", label: "Truck Id", required: true },
    { name: "destinationId", label: "Destination Id", required: true },
    { name: "deliveryDate", label: "Delivery Date", required: true },
  ];

  return (
    <>
      <ReusableDataTable
        title="Route"
        data={deliveries}
        columns={columns}
        fields={fields}
        handleOpenModal={handleOpenModal}
        createEntity={createDelivery}
        updateEntity={updateDelivery}
        deleteEntity={deleteDelivery}
        getAllEntities={getAllDeliveries}
      />
      <CRUDModal
        entityType="delivery"
        open={open}
        handleClose={handleClose}
        operation={operation}
        currentData={currentData}
        fields={fields}
        createEntity={createDelivery}
        updateEntity={updateDelivery}
        deleteEntity={deleteDelivery}
        getAllEntities={getAllDeliveries}
      />
    </>
  );
};
RoutesTrucks.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  operation: PropTypes.string,
  currentData: PropTypes.object,
  handleOpenModal: PropTypes.func.isRequired,
  entityType: PropTypes.string,
  getAllEntities: PropTypes.func.isRequired,
};

export default RoutesTrucks;
