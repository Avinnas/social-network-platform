import './App.css';
import SimpleAppbar from "./components/SimpleAppbar";
import Messenger from "./components/Messenger";
import Login from "./components/Login";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";


function App() {
  return (
      <Router>
      <SimpleAppbar/>
          <Routes>
              <Route path="/" element={<Messenger/>}>
              </Route>
              <Route path="/login" element={<Login/>}>
              </Route>
          </Routes>

      </Router>
  );
}

export default App;
