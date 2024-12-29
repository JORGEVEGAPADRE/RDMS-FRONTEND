// ListTruckComponent.jsx
import { listDestinations } from "../services/DestinationService";
import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { IconButton, Tooltip, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
//import CRUDT from "./CRUDTrucks";
import useStore from "../hooks/useStore";
import CRUDDestinations from "./CRUDDestinations";

const ListDestinationComponent = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [operation, setOperation] = useState("");
  const { destinations, setDestinations } = useStore();

  const handleOpenModal = (op, row = null) => {
    setOperation(op);
    setSelectedRow(row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "addressDescription",
      label: "Address Description",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "addressAlias",
      label: "Address Alias",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "addressLatitude",
      label: "Latitude",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "addressLongitude",
      label: "Longitude",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "acciones",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta) => {
          const rowId = tableMeta.rowData[0]; // Accede al ID de la fila
          return (
            <div>
              <Tooltip
                title="Edit Destination"
                placement="top-start"
              >
                <IconButton
                  aria-label="edit"
                  color="info"
                  size="small"
                  onClick={() =>
                    handleOpenModal("Edit", {
                      id: rowId,
                      addressDescription: tableMeta.rowData[1],
                      addressAlias: tableMeta.rowData[2],
                      addressLatitude: tableMeta.rowData[3],
                      addressLongitude: tableMeta.rowData[4],
                    })
                  }
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              &nbsp;&nbsp;
              <Tooltip
                title="Delete Destination"
                placement="top-start"
              >
                <IconButton
                  color="error"
                  aria-label="delete"
                  size="small"
                  onClick={() =>
                    handleOpenModal("Delete", {
                      id: rowId,
                      addressDescription: tableMeta.rowData[1],
                      addressAlias: tableMeta.rowData[2],
                      addressLatitude: tableMeta.rowData[3],
                      addressLongitude: tableMeta.rowData[4],
                    })
                  }
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    filterType: "checkbox",
    responsive: "standard",
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 20, 50],
  };

  console.log(destinations);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpenModal("Add")}
      >
        Create Destination
      </Button>
      <MUIDataTable
        title={"Create, Edit, Delete Destination"}
        data={destinations}
        columns={columns}
        options={options}
      />
      <CRUDDestinations
        open={modalOpen}
        handleClose={handleCloseModal}
        operation={operation}
        currentData={selectedRow}
      />
    </div>
  );
};

export default ListDestinationComponent;
