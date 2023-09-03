import { Box, Button, Grid, TextField } from "@mui/material";

import { useState } from "react";
import {
  DiscordLoginButton,
  GithubLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import pocketbase from "../../database"; // :grimacing:

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
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Box width={"50vw"}>
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
              sx={{ marginTop: "2vh" }}
            >
              Login
            </Button>
          </Box>

          <Box>
            <>
              <GoogleLoginButton
                align="center"
                onClick={() => oauth2("google")}
              />
            </>

            <>
              <GithubLoginButton
                align="center"
                onClick={() => oauth2("github")}
              />
            </>

            <>
              <DiscordLoginButton
                align="center"
                onClick={() => oauth2("discord")}
              />
            </>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
