import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import pocketbase from "../database";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <Box marginTop={"2vh"} width={"25vw"}>
      <Typography variant="h4">Register</Typography>

      <Box marginTop={"4vh"}>
        <TextField
          label="Username"
          variant="outlined"
          sx={{ marginBottom: "1vh" }}
          fullWidth
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          sx={{ marginBottom: "1vh" }}
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          sx={{ marginBottom: "1vh" }}
          variant="outlined"
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          type="password"
          sx={{ marginBottom: "1vh" }}
          variant="outlined"
          fullWidth
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <Box
          display={"flex"}
          justifyContent={"right"}
          mt={"1vh"}
          sx={{ textAlign: "left" }}
        >
          <Button
            disabled={!email || !username || !password || !passwordConfirm}
            onClick={async () => {
              try {
                await pocketbase.collection("users").create({
                  username,
                  email,
                  emailVisibility: false,
                  password,
                  passwordConfirm,
                });

                await pocketbase
                  .collection("users")
                  .authWithPassword(email, password);
              } catch (e) {
                console.error(e);
              }
            }}
            sx={{ marginTop: "1vh" }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
