import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";

export default function LoginFailedDialog(props: {
  open: boolean;
  close: () => void;
}) {
  const { open, close } = props;

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Login Failed</DialogTitle>
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
        <DialogContentText>
          Your username or password was incorrect.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}
