import { Box, Button, TextField } from "@mui/material";

import { useState } from "react";
import {
  DiscordLoginButton,
  GithubLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import pocketbase from "../../database"; // :grimacing:
import "./Login.css";

export default function LoginPage() {
  async function oauth2(provider: string) {
    try {
      await pocketbase.collection("users").authWithOAuth2({ provider });
    } catch (e) {
      console.error(e);
    }
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box>
      <Box>
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

        <Button
          disabled={!username || !password}
          onClick={async () => {
            try {
              await pocketbase
                .collection("users")
                .authWithPassword(username, password);
            } catch (e) {
              console.error(e);
            }
          }}
        >
          Login
        </Button>
      </Box>

      <Box sx={{ padding: "4vh" }} className="loginButtons">
        <>
          <GoogleLoginButton align="center" onClick={() => oauth2("google")} />
        </>

        <>
          <GithubLoginButton align="center" onClick={() => oauth2("github")} />
        </>

        <>
          <DiscordLoginButton
            align="center"
            onClick={() => oauth2("discord")}
          />
        </>
      </Box>
    </Box>
  );
}
