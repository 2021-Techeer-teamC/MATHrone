import './App.css';
import Main from './Pages/Main'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InfoPage from "./Pages/InfoPage";
import Books from "./Pages/Books";
import BookDetail from "./Pages/BookDetail";
import Rank from "./Pages/Rank";
import SignIn from "./Pages/User/SignIn";
import SignUp from "./Pages/User/SignUp";
import ProblemDetail from './Pages/ProblemDetail';

const theme = createTheme();

const sections = [
  { title: "소개", url: "/info" },
  { title: "교재", url: "/books" },
  { title: "랭킹", url: "/rank" },
];

function App() {
  return (
    <Router>
      <div className="App">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" exact element={<Main sections={sections}/>} />
            <Route path="/signin" exact element={<SignIn/>} />
            <Route path="/signup" exact element={<SignUp/>} />
            <Route path="/info" exact element={<InfoPage sections={sections}/>} />
            <Route path="/books" exact element={<Books sections={sections}/>} />
            <Route path="/books/:id" element={<BookDetail sections={sections}/>} />
            <Route path="/rank" exact element={<Rank sections={sections}/>} />
            <Route path="/problemdetail" exact element={<ProblemDetail sections={sections}/>} /> {/*임시 테스트용*/}
          </Routes>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
