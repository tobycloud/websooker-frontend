import {
  Avatar,
  Box,
  Button,
  IconButton,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import pocketbase from "../database";
import LoginDialog from "./Login";
export default function AppBar() {
  const [_openLogin, openLogin] = useState(false);

  const user = pocketbase.authStore.model;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Webhook to WebSocket
          </Typography>
          {!user || !pocketbase.authStore.isValid ? (
            <>
              <Button color="inherit" onClick={() => openLogin(true)}>
                Login
              </Button>
              <LoginDialog
                onClose={() => openLogin(false)}
                open={_openLogin}
              ></LoginDialog>
            </>
          ) : (
            <Box>
              <IconButton>
                <Avatar
                  alt="That's you lol"
                  src={pocketbase.files.getUrl(user, user.avatar)}
                ></Avatar>
              </IconButton>
              {/* <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography color={"red"} textAlign="center">Log out</Typography>
                </MenuItem>
              </Menu> */}
            </Box>
          )}
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
