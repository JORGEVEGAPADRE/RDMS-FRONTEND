// ListTruckComponent.jsx
import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { IconButton, Tooltip, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CRUDTrucks from "./CRUDTrucks";
import useStore from "../hooks/useStore";

const ListTruckComponent = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [operation, setOperation] = useState("");
  const { trucks, setTrucks } = useStore();

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
      name: "truckPatent",
      label: "Truck Patent",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "truckCapacity",
      label: "Truck Capacity",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "truckService",
      label: "Truck Service",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "truckType",
      label: "Truck Type",
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
                title="Edit Contact"
                placement="top-start"
              >
                <IconButton
                  aria-label="edit"
                  color="info"
                  size="small"
                  onClick={() =>
                    handleOpenModal("Edit", {
                      id: rowId,
                      truckPatent: tableMeta.rowData[1],
                      truckCapacity: tableMeta.rowData[2],
                      truckService: tableMeta.rowData[3],
                      truckType: tableMeta.rowData[4],
                    })
                  }
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              &nbsp;&nbsp;
              <Tooltip
                title="Delete Contact"
                placement="top-start"
              >
                <IconButton
                  color="error"
                  aria-label="delete"
                  size="small"
                  onClick={() =>
                    handleOpenModal("Delete", {
                      id: rowId,
                      truckPatent: tableMeta.rowData[1],
                      truckCapacity: tableMeta.rowData[2],
                      truckService: tableMeta.rowData[3],
                      truckType: tableMeta.rowData[4],
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

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpenModal("Add")}
      >
        Create Truck
      </Button>
      <MUIDataTable
        title={"Create, Edit, Delete Truck"}
        data={trucks}
        columns={columns}
        options={options}
      />
      <CRUDTrucks
        open={modalOpen}
        handleClose={handleCloseModal}
        operation={operation}
        currentData={selectedRow}
      />
    </div>
  );
};

export default ListTruckComponent;
