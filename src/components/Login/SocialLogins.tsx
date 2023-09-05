import { Box } from "@mui/material";
import {
  DiscordLoginButton,
  GithubLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import oauth2 from "../../database/oauth2";

export default function SocialLogins() {
  return (
    <Box marginTop={"10vh"}>
      <>
        <GoogleLoginButton align="center" onClick={() => oauth2("google")}>
          Continue with Google
        </GoogleLoginButton>
      </>

      <>
        <GithubLoginButton align="center" onClick={() => oauth2("github")}>
          Continue with GitHub
        </GithubLoginButton>
      </>

      <>
        <DiscordLoginButton align="center" onClick={() => oauth2("discord")}>
          Continue with Discord
        </DiscordLoginButton>
      </>
    </Box>
  );
}
