import { ArrowForward } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  DiscordLoginButton,
  GithubLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import pocketbase from "../../database";
import LoginFailedDialog from "./FailedDialog";

export default function LoginForm() {
  async function oauth2(provider: string) {
    try {
      await pocketbase.collection("users").authWithOAuth2({ provider });
    } catch (e) {
      console.error(e);
    }
  }

  const [signingIn, setSigningIn] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box width={"25vw"}>
      <Typography variant="h4">Login</Typography>

      <Box marginTop={"4vh"}>
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
        <br />

        <Box
          display={"flex"}
          justifyContent={"right"}
          mt={"1vh"}
          sx={{ textAlign: "left" }}
        >
          <Button
            disabled={!username || !password}
            onClick={async () => {
              setSigningIn(true);
              try {
                await pocketbase
                  .collection("users")
                  .authWithPassword(username, password);
              } catch (e) {
                console.error(e);
                setLoginFailed(true);
              }
              setSigningIn(false);
            }}
            endIcon={
              signingIn ? <CircularProgress size={"2.1vw"} /> : <ArrowForward />
            }
          >
            Login
          </Button>
        </Box>

        <LoginFailedDialog
          open={loginFailed}
          close={() => setLoginFailed(false)}
        />
      </Box>

      <Box marginTop={"10vh"}>
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
