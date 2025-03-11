import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Home from "./components/Home";
import CreateOrder from './components/CreateOrder';  // Import your CreateOrder component
import Navbar from './components/Navbar';  // Import Navbar

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar wird hier eingefügt */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/CreateOrder" element={<CreateOrder />} />
      </Routes>
    </Router>
  );
}

export default App;
