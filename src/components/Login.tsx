import { Dialog, DialogTitle } from "@mui/material";

export default function LoginDialog(props: {
  open: boolean;
  onClose: () => void;
}) {
  const { open, onClose } = props;
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Login</DialogTitle>
    </Dialog>
  );
}
