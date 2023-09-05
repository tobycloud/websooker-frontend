import { Box } from "@mui/material";
import {
  DiscordLoginButton,
  GithubLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import pocketbase from "../../database";

export default function SocialLogins() {
  async function oauth2(provider: string) {
    try {
      await pocketbase.collection("users").authWithOAuth2({ provider });
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <Box marginTop={"10vh"}>
      <>
        <GoogleLoginButton align="center" onClick={() => oauth2("google")} />
      </>

      <>
        <GithubLoginButton align="center" onClick={() => oauth2("github")} />
      </>

      <>
        <DiscordLoginButton align="center" onClick={() => oauth2("discord")} />
      </>
    </Box>
  );
}
