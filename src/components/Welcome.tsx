import { Box, Grid, Typography } from "@mui/material";
import NewWebSookDialogAndButton from "./WebSook/New";

export default function Welcome() {
  return (
    <Box>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h3" align="center">
              Welcome to WebSooker
            </Typography>
            <Typography variant="h6" marginTop={"2vh"} align="center">
              You have no WebSooks yet. Create a new one by clicking the button
              below.
            </Typography>
            <Box display={"flex"} justifyContent={"center"} mt={"2vh"}>
              <NewWebSookDialogAndButton />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
