import { ThemeProvider } from "@emotion/react";
import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  CssBaseline,
  Grid,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { useMemo, useState } from "react";
import AppBar from "./components/AppBar";
import pocketbase from "./database";
import LoginPage from "./pages/Login";

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  const [_loggedIn, loggedIn] = useState(pocketbase.authStore.isValid);

  pocketbase.authStore.onChange((token, model) => loggedIn(!!(token && model)));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {_loggedIn ? <RealApp /> : <LoginPage />}
    </ThemeProvider>
  );
}

function RealApp() {
  return (
    <>
      <AppBar />
      {pocketbase.authStore.model!.urls === 0 ? (
        <Box>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={3}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h3" align="center">
                  Welcome to Webhook 2 WebSocket
                </Typography>
                <Typography variant="h6" marginTop={"2vh"} align="center">
                  You have no WebSooks yet. Create a new one by clicking the
                  button below.
                </Typography>
                <Box display={"flex"} justifyContent={"center"} mt={"2vh"}>
                  <Button startIcon={<Add />}>
                    <Typography variant="h6" align="center">
                      Create new WebSook
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box></Box>
      )}
    </>
  );
}
