import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import ReusableDataTable from "./ReusableDataTable";
import CRUDModal from "./CRUDModal";
import StoreContext from "../context/StoreProvider";
const ListDestinationComponent = ({
  open,
  handleClose,
  operation,
  currentData,
  handleOpenModal,
}) => {
  const {
    destinations,
    getAllDestinations,
    createDestination,
    updateDestination,
    deleteDestination,
  } = useContext(StoreContext);

  useEffect(() => {
    getAllDestinations();
  }, []);

  const columns = [
    { name: "id", label: "ID", options: { filter: true, sort: true } },
    {
      name: "addressDescription",
      label: "Address Description",
      options: { filter: true, sort: true },
    },
    {
      name: "addressAlias",
      label: "Address Alias",
      options: { filter: true, sort: true },
    },
    {
      name: "addressLatitude",
      label: "Address Latitude",
      options: { filter: true, sort: true },
    },
    {
      name: "addressLongitude",
      label: "Address Longitude",
      options: { filter: true, sort: true },
    },
    {
      name: "acciones",
      label: "Actions",
      options: { filter: false, sort: false },
    },
  ];

  const fields = [
    {
      name: "addressDescription",
      label: "Address Description",
      required: true,
    },
    { name: "addressAlias", label: "Address Alias", required: true },
    { name: "addressLatitude", label: "Address Latitude", required: true },
    { name: "addressLongitude", label: "Address Longitude", required: true },
  ];

  return (
    <>
      <ReusableDataTable
        title="Destination"
        data={destinations}
        columns={columns}
        fields={fields}
        handleOpenModal={handleOpenModal}
        createEntity={createDestination}
        updateEntity={updateDestination}
        deleteEntity={deleteDestination}
        getAllEntities={getAllDestinations}
      />
      <CRUDModal
        entityType="destination"
        open={open}
        handleClose={handleClose}
        operation={operation}
        currentData={currentData}
        fields={fields}
        createEntity={createDestination}
        updateEntity={updateDestination}
        deleteEntity={deleteDestination}
        getAllEntities={getAllDestinations}
      />
    </>
  );
};
ListDestinationComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  operation: PropTypes.string,
  currentData: PropTypes.object,
  handleOpenModal: PropTypes.func.isRequired,
  entityType: PropTypes.string,
  getAllEntities: PropTypes.func.isRequired,
};

export default ListDestinationComponent;
