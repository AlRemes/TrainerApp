import logo from "./logo.svg";
import "./App.css";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Customers from "./components/Customers.js";
import Trainings from "./components/Trainings.js";
import Navigation from "./components/Navigation.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Trainers appS
              <Navigation />
            </Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route exact path="/" element={<Customers />} />
          <Route path="/trainings" element={<Trainings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
