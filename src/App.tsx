import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme, useMediaQuery } from "@mui/material";
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
    </>
  );
}
