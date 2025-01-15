import Sidebar from "./components/Sidebar";
//import Feed from "./components/Feed";
//import Rightbar from "./components/originales/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar";
import { SnackbarProvider } from "notistack";
import { CssBaseline, Hidden } from "@mui/material";
import { useState } from "react";
import useStore from "./hooks/useStore";
import { useEffect } from "react";
import { ClassNames } from "@emotion/react";

function App() {
  const [mode, setMode] = useState("light");

  const { currentOp } = useStore();

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  //const { initializePost } = useStore();

  // useEffect(() => {
  //   initializePost();
  // }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={2000}
      >
        <Box
          bgcolor={"background.default"}
          color={"text.primary"}
          sx={{
            display: { md: "block" },
          }}
        >
          <Navbar
            setMode={setMode}
            mode={mode}
          />

          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            color={"text.primary"}
          >
            <Hidden only={["xs", "sm"]}>
              <Sidebar
                setMode={setMode}
                mode={mode}
              />
            </Hidden>
          </Stack>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
