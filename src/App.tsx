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
import NewWebSookDialog from "./components/WebSook/NewDialog";
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
  const [newWebSookDialogOpen, setNewWebSookDialogOpen] = useState(false);

  const [zeroUrls, setZeroUrls] = useState(false);

  pocketbase
    .collection("users")
    .getOne(pocketbase.authStore.model!.id)
    .then((user) => {
      if (user.urls === 0) setZeroUrls(true);
      // pocketbase auto cancel smh
      pocketbase
        .collection("users")
        .subscribe(pocketbase.authStore.model!.id, (user) => {
          if (user.record.urls === 0) setZeroUrls(true);
          else setZeroUrls(false);
        });
    });

  return (
    <>
      <AppBar />
      {zeroUrls ? (
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
                  <Button
                    onClick={() => setNewWebSookDialogOpen(true)}
                    startIcon={<Add />}
                  >
                    <Typography variant="h6" align="center">
                      Create new WebSook
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <NewWebSookDialog
            open={newWebSookDialogOpen}
            close={() => setNewWebSookDialogOpen(false)}
          />
        </Box>
      ) : (
        <Box></Box>
      )}
    </>
  );
}
