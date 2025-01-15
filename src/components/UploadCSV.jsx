import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useSnackbar } from "notistack";
import Papa from "papaparse";
import axios from "axios";

const UploadCSV = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [page, setPage] = useState(0);
  const recordsPerPage = 6;
  const { enqueueSnackbar } = useSnackbar();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setCsvFile(file); // Almacenamos el archivo CSV
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setCsvData(result.data);
        enqueueSnackbar("CSV file loaded successfully!", {
          variant: "success",
        });
      },
      error: (error) => {
        enqueueSnackbar(`Error parsing CSV file: ${error.message}`, {
          variant: "error",
        });
      },
    });
  };

  const handleSave = async () => {
    if (!csvFile) return;

    const formData = new FormData();
    formData.append("file", csvFile); // FormData para enviar como multipart/form-data

    try {
      await axios.post("http://localhost:8080/api/routedriver", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      enqueueSnackbar("Records saved successfully!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(`Error saving records: ${error.message}`, {
        variant: "error",
      });
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const paginatedData = csvData.slice(
    page * recordsPerPage,
    (page + 1) * recordsPerPage
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
      >
        Upload CSV to RouteDriver Table
      </Typography>
      <Button
        variant="contained"
        component="label"
        sx={{ mb: 2 }}
      >
        Upload CSV
        <input
          type="file"
          accept=".csv"
          hidden
          onChange={handleFileUpload}
        />
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Truck ID</TableCell>
              <TableCell>Destination ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.truckId}</TableCell>
                <TableCell>{row.destinationId}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          variant="contained"
          onClick={handlePrevPage}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={(page + 1) * recordsPerPage >= csvData.length}
        >
          Next
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ mt: 2 }}
        >
          Save Records
        </Button>
      </Box>
    </Box>
  );
};

export default UploadCSV;
