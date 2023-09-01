import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";

import { useState } from "react";
import {
  DiscordLoginButton,
  GithubLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import pocketbase from "../../database"; // :grimacing:
import "./Login.css";

export default function LoginDialog(props: {
  open: boolean;
  onClose: () => void;
}) {
  const { open, onClose } = props;

  function oauth2(provider: string) {
    pocketbase.collection("users").authWithOAuth2({ provider });
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Dialog onClose={onClose} open={open} maxWidth={"sm"} fullWidth>
      <div>
        <DialogContent>
          <TextField
            id="username"
            label="Username or email address"
            variant="outlined"
            sx={{ marginBottom: "1vh" }}
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button disabled={!username || !password}>Login</Button>
        </DialogActions>
      </div>

      <div style={{ padding: "4vh" }}>
        <div className="loginButton">
          <GoogleLoginButton align="center" onClick={() => oauth2("google")} />
        </div>

        <div className="loginButton">
          <GithubLoginButton align="center" onClick={() => oauth2("github")} />
        </div>

        <div className="loginButton">
          <DiscordLoginButton
            align="center"
            onClick={() => oauth2("discord")}
          />
        </div>
      </div>
    </Dialog>
  );
}
