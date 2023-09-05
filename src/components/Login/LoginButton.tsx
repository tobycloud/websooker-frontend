import { ArrowForward } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import pocketbase from "../../database";

export default function LoginButton(props: {
  username: string;
  password: string;
  onLoginFailed: () => void;
}) {
  const { username, password, onLoginFailed } = props;

  const [signingIn, setSigningIn] = useState(false);

  return (
    <Button
      disabled={!username || !password || signingIn}
      onClick={async () => {
        setSigningIn(true);
        try {
          await pocketbase
            .collection("users")
            .authWithPassword(username, password);
        } catch (e) {
          console.error(e);
          onLoginFailed();
        }
        setSigningIn(false);
      }}
      endIcon={
        signingIn ? <CircularProgress size={"2.1vw"} /> : <ArrowForward />
      }
    >
      Login
    </Button>
  );
}
