import * as React from "react";
import "../Assets/styles/components.css"

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";


const theme = createTheme();

export default function Main(props) {
  return (
    <>
      <Header title="MATHrone" />
      <NavBar sections={props.sections} />
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </>
  );
}
