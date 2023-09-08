import { Box, ButtonProps } from "@mui/material";
import { useState } from "react";
import NewWebSookButton from "./NewButton";
import NewWebSookDialog from "./NewDialog";

export default function NewWebSookDialogAndButton(props: {
  buttonText?: string;
  buttonProps?: ButtonProps;
}) {
  const { buttonText, buttonProps } = props;

  const [_openDialog, openDialog] = useState(false);

  return (
    <Box>
      <NewWebSookButton
        buttonProps={buttonProps}
        openDialog={() => openDialog(true)}
      >
        {buttonText ?? "Create new WebSook"}
      </NewWebSookButton>
      <NewWebSookDialog open={_openDialog} close={() => openDialog(false)} />
    </Box>
  );
}
