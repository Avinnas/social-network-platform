import './App.css';
import SimpleAppbar from "./components/SimpleAppbar";
import Messenger from "./components/Messenger";
import Login from "./components/Login";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth"

import './utils/jwtInterceptor'

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
              <Route path="/" element={<Home/>}>
              </Route>
              <Route path="/messenger" element={
                  <RequireAuth>
                      <Messenger/>
                  </RequireAuth>}>
              </Route>
              <Route path="/login" element={<Login/>}>
              </Route>
          </Routes>

      </Router>
  );
}

export default App;
