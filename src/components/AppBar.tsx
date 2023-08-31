import {
  Box,
  Button,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import LoginDialog from "./Login";
export default function AppBar() {
  const [open, setOpen] = useState(false);

  function onClose() {
    setOpen(false);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Webhook to WebSocket
          </Typography>
          <Button color="inherit" onClick={() => setOpen(true)}>
            Login
          </Button>
          <LoginDialog onClose={onClose} open={open}></LoginDialog>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
