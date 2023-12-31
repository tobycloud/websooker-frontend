import { Box, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import LoginButton from "./LoginButton";
import SocialLogins from "./SocialLogins";

export default function LoginForm(props: {
  openRegisterPage: () => void;
  onFailedLogin?: () => void;
}) {
  const { openRegisterPage } = props;
  const onFailedLogin = props.onFailedLogin || (() => {});

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
            onLoginFailed={onFailedLogin}
          />
        </Box>
      </Box>

      <Box marginTop={"2vh"}>
        <Link href="#" onClick={openRegisterPage}>
          Don't have an account? Register here.
        </Link>
      </Box>

      <Box marginTop={"8vh"}>
        <SocialLogins />
      </Box>
    </Box>
  );
}
