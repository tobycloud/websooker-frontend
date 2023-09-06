import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline, createTheme, useMediaQuery } from "@mui/material";
import { RecordSubscription } from "pocketbase";
import { useMemo, useState } from "react";
import AppBar from "./components/AppBar";
import WebSookList from "./components/WebSook/HomePageList";
import Welcome from "./components/WelcomeMessageWithAdd";
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
  const [zeroUrls, setZeroUrls] = useState(
    pocketbase.authStore.model!.urls === 0
  );

  pocketbase
    .collection("users")
    .subscribe(pocketbase.authStore.model!.id, updateAuthStore);

  pocketbase.authStore.onChange((_, user) => {
    if (!user) return;
    if (user.urls === 0) setZeroUrls(true);
    else setZeroUrls(false);
  });

  return (
    <>
      <AppBar />
      {zeroUrls ? (
        <Welcome />
      ) : (
        <Box>
          <WebSookList />
        </Box>
      )}
    </>
  );
}
