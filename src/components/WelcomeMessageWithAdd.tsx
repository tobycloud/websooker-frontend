import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import NewWebSookDialog from "./WebSook/NewDialog";

export default function Welcome() {
  const [_openDialog, openDialog] = useState(false);

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
              Welcome to Webhook 2 WebSocket
            </Typography>
            <Typography variant="h6" marginTop={"2vh"} align="center">
              You have no WebSooks yet. Create a new one by clicking the button
              below.
            </Typography>
            <Box display={"flex"} justifyContent={"center"} mt={"2vh"}>
              <Button onClick={() => openDialog(true)} startIcon={<Add />}>
                <Typography variant="h6" align="center">
                  Create new WebSook
                </Typography>
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <NewWebSookDialog open={_openDialog} close={() => openDialog(false)} />
    </Box>
  );
}
