import React, { useState } from "react";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import { IconButton, Tooltip, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CRUDModal from "./CRUDModal";

const ReusableDataTable = ({
  title,
  data,
  columns,
  fields,
  handleSubmit,
  createEntity,
  updateEntity,
  deleteEntity,
  getAllEntities,
  entityType,
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [operation, setOperation] = useState("");

  const handleOpenModal = (op, row = null) => {
    setOperation(op);
    setSelectedRow(row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };

  const options = {
    selectableRows: "none",
    filter: false,
    filterType: "checkbox",
    responsive: "standard",
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15],
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpenModal("Add")}
        sx={{
          marginBottom: "10px",
        }}
      >
        Create {title}
      </Button>

      <MUIDataTable
        title={`Create, Edit, Delete ${title}`}
        data={data}
        columns={columns.map((column) => ({
          ...column,
          options: {
            ...column.options,
            customBodyRender:
              column.name === "acciones"
                ? (value, tableMeta) => {
                    const rowId = tableMeta.rowData[0];
                    return (
                      <div>
                        <Tooltip
                          title={`Edit ${title}`}
                          placement="top-start"
                        >
                          <IconButton
                            aria-label="edit"
                            color="info"
                            size="small"
                            onClick={() =>
                              handleOpenModal("Edit", {
                                id: rowId,
                                ...tableMeta.rowData
                                  .slice(1)
                                  .reduce((acc, val, idx) => {
                                    acc[columns[idx + 1].name] = val;
                                    return acc;
                                  }, {}),
                              })
                            }
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        &nbsp;&nbsp;
                        <Tooltip
                          title={`Delete ${title}`}
                          placement="top-start"
                        >
                          <IconButton
                            color="error"
                            aria-label="delete"
                            size="small"
                            onClick={() =>
                              handleOpenModal("Delete", {
                                id: rowId,
                                ...tableMeta.rowData
                                  .slice(1)
                                  .reduce((acc, val, idx) => {
                                    acc[columns[idx + 1].name] = val;
                                    return acc;
                                  }, {}),
                              })
                            }
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    );
                  }
                : column.options?.customBodyRender,
          },
        }))}
        options={options}
      />
      <CRUDModal
        open={modalOpen}
        handleClose={handleCloseModal}
        operation={operation}
        currentData={selectedRow}
        fields={fields}
        handleSubmit={handleSubmit}
        createEntity={createEntity}
        updateEntity={updateEntity}
        deleteEntity={deleteEntity}
        getAllEntities={getAllEntities}
        entityType={entityType}
      />
    </div>
  );
};
// Validación de Props
ReusableDataTable.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  createEntity: PropTypes.func.isRequired,
  updateEntity: PropTypes.func.isRequired,
  deleteEntity: PropTypes.func.isRequired,
  getAllEntities: PropTypes.func.isRequired,
  entityType: PropTypes.string.isRequired,
};

export default ReusableDataTable;
