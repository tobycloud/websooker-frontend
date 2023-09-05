import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import LoginFailedDialog from "./FailedDialog";
import LoginButton from "./LoginButton";
import SocialLogins from "./SocialLogins";

export default function LoginForm() {
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
          <LoginButton
            username={username}
            password={password}
            onLoginFailed={() => setLoginFailed(true)}
          />
        </Box>

        <LoginFailedDialog
          open={loginFailed}
          close={() => setLoginFailed(false)}
        />
      </Box>

      <SocialLogins />
    </Box>
  );
}
