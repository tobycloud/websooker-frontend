import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "./components/AppBar";

import React, { useState } from "react";

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RealApp />
    </ThemeProvider>
  );
}

function RealApp() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AppBar />
      <Button variant="contained" onClick={() => setCount(count + 1)}>
        Clicked {count} times
      </Button>
    </>
  );
}
