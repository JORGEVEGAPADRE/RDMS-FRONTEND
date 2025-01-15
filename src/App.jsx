import Sidebar from "./components/Sidebar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SnackbarProvider } from "notistack";
import { CssBaseline, Hidden } from "@mui/material";
import { useState, useEffect } from "react";
import useStore from "./hooks/useStore";

function App() {
  const [mode, setMode] = useState("light");

  const { currentOp, initializePost } = useStore();

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={2000}
      >
        <Box
          display="flex"
          flexDirection="column"
          minHeight="100vh"
          bgcolor={"background.default"}
          color={"text.primary"}
        >
          <Navbar
            setMode={setMode}
            mode={mode}
          />
          <Box
            component="main"
            flex="1"
            display="flex"
            flexDirection="column"
          >
            <Stack
              direction="row"
              spacing={1}
              justifyContent="space-between"
              flex="1"
            >
              <Hidden only={["xs", "sm"]}>
                <Sidebar
                  setMode={setMode}
                  mode={mode}
                />
              </Hidden>
              {/* Agregar tu Feed o cualquier otro contenido aquí */}
            </Stack>
          </Box>
          <Footer
            setMode={setMode}
            mode={mode}
          />
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
