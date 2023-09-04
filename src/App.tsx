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
import { RecordSubscription } from "pocketbase";
import { useMemo, useState } from "react";
import AppBar from "./components/AppBar";
import NewWebSookDialog from "./components/WebSook/NewDialog";
import pocketbase from "./database";
import LoginPage from "./pages/Login";

function updateAuthStore(event: RecordSubscription) {
  if (event.action == "delete") {
    pocketbase.authStore.clear();
    pocketbase.collection("users").unsubscribe(pocketbase.authStore.model!.id);
  } else {
    pocketbase.authStore.save(pocketbase.authStore.token, event.record);
  }
}

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

  const [zeroUrls, setZeroUrls] = useState(
    pocketbase.authStore.model!.urls === 0
  );

  pocketbase
    .collection("users")
    .subscribe(pocketbase.authStore.model!.id, updateAuthStore);

  pocketbase.authStore.onChange((token, model) => {
    if (!model) return;
    if (model.urls === 0) setZeroUrls(true);
    else setZeroUrls(false);
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
