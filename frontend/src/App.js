import './App.css';
import Main from './Pages/Main'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

import InfoPage from "./Pages/InfoPage";
import Books from "./Pages/Books";
import Workbook from "./Pages/BookDetail";
import Rank from "./Pages/Rank";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" exact element={<Main />} />
            <Route path="/login" exact element={<SignIn />} />
            <Route path="/info" exact element={<InfoPage />} />
            <Route path="/books" exact element={<Books />} />
            <Route path="/workbook" exact element={<Workbook />} />
            <Route path="/rank" exact element={<Rank />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
