import { ArrowForward, Close, MenuBook } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import LoginFailedDialog from "../components/Login/FailedDialog";
import LoginForm from "../components/Login/Form";
import RegisterForm from "../components/RegisterForm";

export default function LandingPage() {
  const [_showLoginDialog, showLoginDialog] = useState(false);
  const [showLoginFailedPopup, openLoginFailedPopup] = useState(false);
  const [_showRegisterDialog, showRegisterDialog] = useState(false);

  function openRegisterDialog() {
    showRegisterDialog(true);
    showLoginDialog(false);
  }

  function closeRegisterDialog() {
    showRegisterDialog(false);
    showLoginDialog(true);
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      margin={"5vh"}
    >
      <Typography fontSize="4vh">
        WebSooker - Transport your webhook events via WebSocket with ease
      </Typography>

      <Box marginTop={"5vh"}>
        <Typography fontSize="2vh">
          WebSooker is a service that allows you to redirect webhook events via
          WebSocket. It's free, secure and easy to use.
        </Typography>
      </Box>

      <Box marginTop={"5vh"}>
        <Button
          variant="contained"
          startIcon={<MenuBook />}
          sx={{ marginRight: "1vw" }}
        >
          Read the docs
        </Button>
        <Button
          variant="contained"
          startIcon={<ArrowForward />}
          onClick={() => showLoginDialog(true)}
        >
          Get started
        </Button>
      </Box>

      <Dialog open={_showLoginDialog} onClose={() => showLoginDialog(false)}>
        <IconButton
          aria-label="close"
          onClick={() => showLoginDialog(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <DialogContent>
          <LoginForm
            openRegisterPage={openRegisterDialog}
            onFailedLogin={() => openLoginFailedPopup(true)}
          />
          <LoginFailedDialog
            open={showLoginFailedPopup}
            close={() => openLoginFailedPopup(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={_showRegisterDialog} onClose={closeRegisterDialog}>
        <IconButton
          aria-label="close"
          onClick={closeRegisterDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <DialogContent>
          <RegisterForm />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
