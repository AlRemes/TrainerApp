import logo from "./logo.svg";
import "./App.css";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Customers from "./components/Customers.js";
import Trainings from "./components/Trainings.js";
import Navigation from "./components/Navigation.js";
import Calendar from "./components/functionality/Calendar.js";
import Statistics from './components/functionality/Statistics.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar style={{backgroundColor:'whitesmoke'}}>
            <Typography variant="h6">
              <Navigation />
            </Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route exact path="/" element={<Calendar />} />
          <Route path="/trainings" element={<Trainings />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
