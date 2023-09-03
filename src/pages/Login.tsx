import { Grid, Typography } from "@mui/material";

import LoginForm from "../components/Login/Form";
import RegisterForm from "../components/RegisterForm";

export default function LoginPage() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={4}>
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={5}>
            <LoginForm />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h5" margin={"5vw"} align="center">
              or
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <RegisterForm />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
