import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "../../Components/Logo";
import { SignUpDiv } from "./style.js";
import axios from "axios";
import { WindowTwoTone } from "@mui/icons-material";

type CreateSignUpesponse = {
  id: string;
};

export default function SignUP() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user_data = new FormData(event.currentTarget);

    try {
      const { data } = await axios.post<CreateSignUpesponse>(
        "http://localhost:8080/user/signup",
        {
          id: user_data.get("ID"),
          email: user_data.get("email"),
          password: user_data.get("password"),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log(JSON.stringify(data));

      window.location.href = "/signin";

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  };
  const theme = createTheme();

  return (
    <SignUpDiv>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Logo />
            <Typography component="h1" variant="h5">
              회원가입
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <FormControl component="fieldset" variant="standard">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      autoFocus
                      fullWidth
                      type="string"
                      id="ID"
                      name="ID"
                      label="사용자 ID"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      autoFocus
                      fullWidth
                      type="email"
                      id="email"
                      name="email"
                      label="이메일 주소"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="password"
                      id="password"
                      name="password"
                      label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    />
                  </Grid>
                </Grid>
                <Button
                  id="signup_button"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  size="large"
                >
                  회원가입
                </Button>
              </FormControl>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </SignUpDiv>
  );
}
