import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import LoginPage from "./Login";

export default function LandingPage() {
  const [_openLoginPage, openLoginPage] = useState(false);

  return _openLoginPage ? (
    <LoginPage />
  ) : (
    <Box>
      <Typography align="center" fontSize={"4vh"}>
        WebSooker - Convert your webhooks into websocket events with ease
      </Typography>
      <Button onClick={() => openLoginPage(true)}>Login</Button>
    </Box>
  );
}
