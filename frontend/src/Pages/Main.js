import * as React from "react";
import "../Assets/styles/components.css"

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";


import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

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
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header title="MATHrone" />
        <NavBar sections={sections}/>
        <Container maxWidth="lg">
          {/*<Paper>*/}
          {/*  <img*/}
          {/*    src="https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80"*/}
          {/*    alt="test image"*/}
          {/*  />*/}
          {/*</Paper>*/}
          <main>
            <Routes>
              <Route path="/login" exact element={<SignIn />} />
              <Route path="/info" exact element={<InfoPage />} />
              <Route path="/books" exact element={<Books />} />
              <Route path="/workbook" exact element={<Workbook />} />
              <Route path="/rank" exact element={<Rank />} />
            </Routes>
          </main>
        </Container>
        <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        />
      </ThemeProvider>
    </Router>
  );
}
