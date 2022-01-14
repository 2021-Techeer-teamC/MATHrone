import logo from './logo.svg';
import './App.css';
import Main from './Pages/Main'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Header from "./Components/Header";
import InfoPage from "./Pages/InfoPage";
import Books from "./Pages/Books";
import Workbook from "./Pages/BookDetail";
import Rank from "./Pages/Rank";
import Footer from "./Components/Footer";
import * as React from "react";

const sections = [
    { title: "소개", url: "/info" },
    { title: "교재", url: "/books" },
    { title: "랭킹", url: "/rank" },
    { title: "소개", url: "/info" },
    { title: "교재", url: "/books" },
    { title: "랭킹", url: "/rank" },
];

const theme = createTheme();



function App() {
  return (
    <div className="App">
        <Router>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="lg">
                    <Header title="MATHrone" sections={sections} />
            <Routes>
                <Route path="/" exact element={<Main/>}/>
                <Route path="/SignUp" exact element={<SignUp/>}/>
                <Route path="/SignIn" exact element={<SignIn/>}/>
                <Route path="/info" exact element={<InfoPage />} />
                <Route path="/books" exact element={<Books />} />
                <Route path="/workbook" exact element={<Workbook />} />
                <Route path="/rank" exact element={<Rank />} />
            </Routes>
                </Container>
                <Footer
                    title="Footer"
                    description="Something here to give the footer a purpose!"
                />
            </ThemeProvider>
        </Router>
    </div>
  );
}

export default App;
