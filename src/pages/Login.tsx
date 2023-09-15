import { Box, IconButton } from "@mui/material";

import { ArrowBack } from "@mui/icons-material";
import { useState } from "react";
import LoginForm from "../components/Login/Form";
import RegisterForm from "../components/RegisterForm";

export default function LoginPage() {
  const [_openRegisterPage, openRegisterPage] = useState(false);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      margin={"5vh"}
    >
      {_openRegisterPage ? (
        <Box>
          <IconButton onClick={() => openRegisterPage(false)}>
            <ArrowBack />
          </IconButton>
          <RegisterForm />
        </Box>
      ) : (
        <LoginForm openRegisterPage={() => openRegisterPage(true)} />
      )}
    </Box>
  );
}
