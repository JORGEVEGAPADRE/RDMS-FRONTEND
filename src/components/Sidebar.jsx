import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import RouteIcon from "@mui/icons-material/Route";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Brightness4 } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import ListDestinationComponent from "./ListDestinationComponent";
import ListTruckComponent from "./ListTruckComponent";

//import useStore from "../hooks/useStore";
//import { Router, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ mode, setMode }) => {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = () => {
    switch (activeComponent) {
      case "trucks":
        return <ListTruckComponent />;
      case "destinations":
        return <ListDestinationComponent />;
      // TODO
      default:
        return null;
    }
  };

  return (
    <Box
      flex={2}
      p={2}
      sx={{ flexDirection: { xs: "column", md: "row" }, height: "100vh" }}
    >
      <Box
        // position="fixed"
        sx={{ width: 300, height: 100, borderRadius: 1 }}
      >
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
                <AddLocationIcon />
              </ListItemIcon>

              <ListItemText primary={"Destinations"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <RouteIcon />
              </ListItemIcon>

              <ListItemText primary={"Create/Update Route Planning"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CloudUploadIcon />
              </ListItemIcon>

              <ListItemText primary={"Load Data From Executed Routes"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FormatListNumberedRtlIcon />
              </ListItemIcon>

              <ListItemText primary={"Show Executed Routes"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GTranslateIcon />
              </ListItemIcon>

              <ListItemText primary={"API Documentation"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SportsSoccerIcon />
              </ListItemIcon>

              <ListItemText primary={"Starting Point"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Brightness4 />
              </ListItemIcon>

              <Switch
                onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
              />
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
