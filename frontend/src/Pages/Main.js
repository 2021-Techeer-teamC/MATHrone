import * as React from "react";
import "../Assets/styles/components.css"

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

import InfoPage from "./InfoPage";
import Books from "./Books";
import Workbook from "./BookDetail";
import Rank from "./Rank";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const sections = [
  { title: "소개", url: "/info" },
  { title: "교재", url: "/books" },
  { title: "랭킹", url: "/rank" },
];

const theme = createTheme();

export default function Main() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header title="MATHrone" />
      <NavBar sections={sections} />
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}
