import './App.css';
import Main from './pages/Main'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { createTheme } from "@mui/material/styles";
import InfoPage from "./pages/InfoPage.js";
import Books from "./pages/Books.tsx";
import BookDetail from "./pages/BookDetail";
import Rank from "./pages/Rank.tsx";
import SignIn from "./pages/User/SignIn.tsx";
import SignUp from "./pages/User/SignUp.tsx";

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
          <Routes>
            <Route path="/" exact element={<Main sections={sections}/>} />
            <Route path="/signin" exact element={<SignIn/>} />
            <Route path="/signup" exact element={<SignUp/>} />
            <Route path="/info" exact element={<InfoPage sections={sections}/>} />
            <Route path="/books" exact element={<Books sections={sections}/>} />
            <Route path="/books/:id" element={<BookDetail sections={sections}/>} />
            <Route path="/rank" exact element={<Rank sections={sections}/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
