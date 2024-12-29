import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Modal, Button } from "@mui/material";
import { styled } from "@mui/system";

import MUIDataTable from "mui-datatables";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Tooltip from "@mui/material/Tooltip";

import { useNavigate, useParams } from "react-router-dom";

//import useStore from "../../hooks/useStore";
import { useEffect, useState } from "react";
//import CRUDTrucks from "./CRUDTrucksOriginal";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const MyModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const MyForm = styled("form")({
  backgroundColor: "white",
  width: "800px",
  height: "400px",
  paddingLeft: "16px",
  paddingTop: "10px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const ListTruckComponent = () => {
  const [data, setData] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [operation, setOperation] = useState("");

  const { trucks, setTrucks } = useStore();

  //  const [op, setOp] = useState(0);

  const handleRowClick = (rowData) => {
    const ide = rowData[0];
    setSelectedRowId(ide);
  };

  const navigator = useNavigate();

  function addNewTruck() {
    navigator("/add-truck");
  }
  function updateTruck(rowId) {
    navigator(`/edittruck/${rowId}`);
  }

  function deleteTruck(rowId, op) {
    navigator(`/deletetruck/${rowId}/${op}`);
  }

  const handleOpenModal = (op, row = null) => {
    //  setOperation(op);
    //  setSelectedRow(row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    // setSelectedRow(null);
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
      label: "Acciones",
      options: {
        customBodyRender: (rowData, tableMeta) => {
          const rowId = tableMeta.rowData[0];
          let op = 1;

          return (
            <div>
              <Tooltip
                title="Edit Truck"
                placement="top-start"
              >
                <IconButton
                  aria-label="delete"
                  size="small"
                >
                  <EditIcon
                    onClick={() => handleOpenModal()}
                    fontSize="small"
                    className="text-blue-700"
                  />
                </IconButton>
              </Tooltip>
              &nbsp;&nbsp;
              <Tooltip
                title="Delete Truck"
                placement="top-start"
              >
                <IconButton
                  aria-label="delete"
                  size="small"
                >
                  <DeleteIcon
                    onClick={() => handleOpenModal()}
                    fontSize="small"
                    className="text text-danger"
                  />
                </IconButton>
              </Tooltip>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    //  customToolbarSelect: () => {},
    onRowSelectionChange: (
      currentRowsSelected,
      allRowsSelected,
      rowsSelected
    ) => {
      setSelectedRowId(rowsSelected.map((row) => row.id));
    },
    onRowClick: (rowData) => {
      handleRowClick(rowData);
    },
    rowsPerPage: 7,
    rowsPerPageOptions: [7, 14, 21, 28],
  };

  const tableStyle = {
    marginLeft: 350,
    width: "70%",
    height: "500px",
  };

  const createStyle = {
    marginLeft: 350,
    marginTop: 50,
  };

  return (
    <div className="grid grid-cols-1">
      <Tooltip
        title="New Truck"
        placement="bottom"
      >
        <div style={createStyle}>
          <Button
            onClick={() => navigator("/createtruck")}
            variant="contained"
            startIcon={<LocalShippingIcon />}
          >
            CREATE
          </Button>
        </div>
      </Tooltip>

      <ThemeProvider theme={darkTheme}>
        <div style={tableStyle}>
          <MUIDataTable
            title={
              <p className="text-xl font-extrabold">
                Create, Update And Delete Trucks
              </p>
            }
            columns={columns}
            data={trucks}
            options={options}
          />
          <CRUDTrucks
            open={modalOpen}
            handleClose={handleCloseModal}
            operation={operation}
            currentData={selectedRowId}
          />
        </div>
      </ThemeProvider>
    </div>
  );
};

export default ListTruckComponent;
