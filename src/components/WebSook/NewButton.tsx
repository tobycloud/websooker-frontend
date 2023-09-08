import { Add } from "@mui/icons-material";
import { Button, ButtonProps, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function NewWebSookButton(props: {
  openDialog: () => void;
  buttonProps?: ButtonProps;
  children?: ReactNode;
}) {
  const { openDialog, buttonProps, children } = props;

  return (
    <Button {...buttonProps} onClick={openDialog} startIcon={<Add />}>
      <Typography align="center">{children ?? "Create new WebSook"}</Typography>
    </Button>
  );
}
