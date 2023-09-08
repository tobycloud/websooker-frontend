import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline, createTheme, useMediaQuery } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import AppBar from "./components/AppBar";
import WebSookList from "./components/WebSook/HomePageList";
import Welcome from "./components/Welcome";
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

  useEffect(() => {
    pocketbase.collection("users").authRefresh();
  }, []);

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
    <>
      <AppBar />
      {zeroUrls ? (
        <Welcome />
      ) : (
        <Box width={"80vw"}>
          <WebSookList />
        </Box>
      )}
    </>
  );
}
