import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useState } from "react";
import pocketbase from "../../database";
import { randomString } from "../../utils";

export default function NewWebSookDialog(props: {
  open: boolean;
  close: () => void;
}) {
  const { open, close } = props;

  const [path, setPath] = useState("");

  return (
    <Dialog maxWidth={"sm"} open={open} onClose={close} fullWidth>
      <DialogTitle>New WebSook</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={close}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogContent>
        <TextField
          label="Path (leave empty to autogenerate)"
          variant="outlined"
          fullWidth
          onChange={(e) => setPath(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={async () => {
            try {
              await pocketbase.collection("websooks").create({
                websookId: path || randomString(6),
                websocketId: randomString(32),
                owner: pocketbase.authStore.model!.id,
              });
            } catch (e) {
              console.error(e);
            }
            close();
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
