import './App.css';
import SimpleAppbar from "./components/SimpleAppbar";
import Messenger from "./components/Messenger";
import Login from "./components/Login";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth"

import './utils/JwtInterceptor'

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import {Container} from "@mui/material";
import Register from "./components/Register";


function App() {
  return (
      <Router>
      <ResponsiveAppBar/>
          <Container maxWidth={"xl"}>
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
                  <Route path="/register" element={<Register/>}>
                  </Route>
              </Routes>

          </Container>

      </Router>
  );
}

export default App;
