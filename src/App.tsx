import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline, createTheme, useMediaQuery } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import AppBar from "./components/AppBar";
import WebSookList from "./components/WebSook/HomePageList";
import Welcome from "./components/Welcome";
import pocketbase from "./database";
import LandingPage from "./pages/LandingPage";

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

  useEffect(() => {
    pocketbase
      .collection("users")
      .authRefresh({ requestKey: "" })
      .then((res) => pocketbase.authStore.save(res.token, res.record))
      .catch(() => pocketbase.authStore.clear());
  }, []);

  const [_loggedIn, loggedIn] = useState(pocketbase.authStore.isValid);

  useEffect(() => {
    pocketbase.authStore.onChange((token, model) =>
      loggedIn(!!(token && model))
    );
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {_loggedIn ? <RealApp /> : <LandingPage />}
    </ThemeProvider>
  );
}

function RealApp() {
  // logged in

  const [zeroUrls, setZeroUrls] = useState(
    pocketbase.authStore.model!.urls === 0
  );

  useEffect(() => {
    pocketbase
      .collection("users")
      .subscribe(pocketbase.authStore.model!.id, (event) => {
        if (event.action == "delete") {
          pocketbase.authStore.clear();
          pocketbase
            .collection("users")
            .unsubscribe(pocketbase.authStore.model!.id);
        } else {
          pocketbase.authStore.save(pocketbase.authStore.token, event.record);
        }
      });

    pocketbase.authStore.onChange((_, user) => {
      if (!user) return;
      setZeroUrls(user.urls === 0);
    });
  }, []);

  return (
    <Box>
      <AppBar />
      {zeroUrls ? <Welcome /> : <WebSookList />}
    </Box>
  );
}
