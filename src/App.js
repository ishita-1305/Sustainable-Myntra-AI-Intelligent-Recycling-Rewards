import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Navbar";
import Home from "./pages/Home";
import Recycle from "./pages/Recycle";
import Dashboard from "./pages/Dashboard";
import Market from "./pages/Market";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recycle" element={<Recycle />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/market" element={<Market />} />
      </Routes>
    </Router>
  );
}
