import {
  AppBar,
  Box,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import useStore from "../hooks/useStore";
import MenuIcon from "@mui/icons-material/Menu";
import { Brightness4 } from "@mui/icons-material";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
}));

const Navbar = ({ mode, setMode }) => {
  const { open, setOpen } = useStore();

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography
          variant="h6"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Routes Drivers Management System ( RDMS V 1.0.0 )
        </Typography>

        <Typography
          variant="h6"
          sx={{ display: { xs: "none", sm: "block" } }}
        ></Typography>

        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <Switch
            onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
          />

          <Brightness4 style={{ verticalAlign: "middle" }} />
        </Box>

        <UserBox>
          <Typography variant="span">VegaSoft Corporation</Typography>

          <MenuIcon
            onClick={(e) => setOpen(true)}
            sx={{ display: { xs: "block", sm: "none" } }}
          />
        </UserBox>
      </StyledToolbar>
      <Menu
        sx={{ display: { xs: "block", sm: "block", md: "none" } }}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Trucks</MenuItem>
        <MenuItem>Destinations</MenuItem>
        <MenuItem>Create/Update Route Planning</MenuItem>
        <MenuItem>Load Data</MenuItem>
        <MenuItem>View Executed Routes</MenuItem>
        <MenuItem>Exit</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
