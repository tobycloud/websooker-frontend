import { Container, Dialog } from "@mui/material";

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

  return (
    <Dialog onClose={onClose} open={open} maxWidth={"sm"} fullWidth>
      <Container style={{ padding: "4vh" }}>
        <GoogleLoginButton
          style={{ padding: "4vh" }}
          align="center"
          onClick={() => oauth2("google")}
        />
        <GithubLoginButton
          className="loginButton"
          align="center"
          onClick={() => oauth2("github")}
        />
        <DiscordLoginButton
          className="loginButton"
          align="center"
          onClick={() => oauth2("discord")}
        />
      </Container>
    </Dialog>
  );
}
