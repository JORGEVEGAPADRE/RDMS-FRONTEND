import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import ElectricRickshawIcon from "@mui/icons-material/ElectricRickshaw";
import ExploreIcon from "@mui/icons-material/Explore";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SouthAmericaIcon from "@mui/icons-material/SouthAmerica";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import RouteIcon from "@mui/icons-material/Route";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Brightness4 } from "@mui/icons-material";
import ListDestinationComponent from "./ListDestinationComponent";
import ListTruckComponent from "./ListTruckComponent";
import RoutesTrucks from "./RoutesTrucks";
import DistanceABcomponent from "./DistanceABcomponent";
import ShowMapDestinations from "./ShowMapDestinations";
import ShowDriverRoute from "./ShowDriverRoute";
import UploadCSV from "./UploadCSV";
import RouteTruckDate from "./RouteTruckDate.jsx";
const Sidebar = ({ mode, setMode }) => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [modalProps, setModalProps] = useState({
    open: false,
    operation: null,
    currentData: null,
  });

  const handleOpenModal = (operation, currentData = null) => {
    setModalProps({ open: true, operation, currentData });
  };

  const handleCloseModal = () => {
    setModalProps({ open: false, operation: null, currentData: null });
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "trucks":
        return (
          <ListTruckComponent
            {...modalProps}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
          />
        );
      case "destinations":
        return (
          <ListDestinationComponent
            {...modalProps}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
          />
        );

      case "destinationsmap":
        return (
          <ShowMapDestinations
            {...modalProps}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
          />
        );
      case "driverroute":
        return (
          <RoutesTrucks
            {...modalProps}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
          />
        );

      case "RouteDriver":
        return (
          <RouteTruckDate
            {...modalProps}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
          />
        );
      case "DistanceAB":
        return (
          <DistanceABcomponent
            {...modalProps}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
          />
        );
      case "UploadCSV":
        return (
          <UploadCSV
            {...modalProps}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
          />
        );

      default:
        return <div>Please select an option from the sidebar.</div>;
    }
  };

  return (
    <Box
      flex={2}
      p={2}
      sx={{ flexDirection: { xs: "column", md: "row" }, height: "100vh" }}
    >
      <Box sx={{ width: 300, height: 100, borderRadius: 1 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setActiveComponent("trucks")}>
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary={"Trucks"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setActiveComponent("destinations")}>
              <ListItemIcon>
                <SportsScoreIcon />
              </ListItemIcon>
              <ListItemText primary={"Destinations"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setActiveComponent("destinationsmap")}
            >
              <ListItemIcon>
                <SouthAmericaIcon />
              </ListItemIcon>
              <ListItemText primary={"Map Destinations"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setActiveComponent("driverroute")}>
              <ListItemIcon>
                <RouteIcon />
              </ListItemIcon>
              <ListItemText primary={"Create/Update Route Planning"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setActiveComponent("UploadCSV")}>
              <ListItemIcon>
                <CloudUploadIcon />
              </ListItemIcon>
              <ListItemText primary={"Upload Data Driver Route Executed"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setActiveComponent("RouteDriver")}>
              <ListItemIcon>
                <ElectricRickshawIcon />
              </ListItemIcon>
              <ListItemText primary={"Map Route Driver Executed"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setActiveComponent("DistanceAB")}>
              <ListItemIcon>
                <ExploreIcon />
              </ListItemIcon>
              <ListItemText primary={"Distance & Coordinates (A,B)"} />
            </ListItemButton>
          </ListItem>

          
        </List>
      </Box>
      <Box
        sx={{
          flex: 1,
          marginLeft: 20,
          marginTop: -10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {renderComponent()}
      </Box>
    </Box>
  );
};

export default Sidebar;
