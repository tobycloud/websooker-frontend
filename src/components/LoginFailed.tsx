import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function LoginFailedDialog(props: {
  open: boolean;
  close: () => void;
}) {
  const { open, close } = props;

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Login Failed</DialogTitle>
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
