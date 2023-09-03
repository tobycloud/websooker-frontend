import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import pocketbase from "../database";
import { openInNewTab } from "../utils";

export default function AppBar() {
  const [_openUserMenu, openUserMenu] = useState(false);
  const [menuLocation, setMenuLocation] = useState<null | HTMLElement>(null);

  const user = pocketbase.authStore.model!;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Webhook to WebSocket
          </Typography>

          <Box>
            <IconButton
              onClick={() => {
                setMenuLocation(document.getElementById("user-menu-button"));
                openUserMenu(true);
              }}
            >
              <Avatar />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={menuLocation}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={_openUserMenu}
              onClose={() => openUserMenu(false)}
            >
              <MenuItem onClick={openInNewTab("https://discord.gg/wJ3kHtmG6J")}>
                <Typography textAlign="center">
                  You have used {user.urls}/{user.maxUrls} urls
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  pocketbase.authStore.clear();
                  openUserMenu(false);
                }}
              >
                <Typography color={"red"} textAlign="center">
                  Log out
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
