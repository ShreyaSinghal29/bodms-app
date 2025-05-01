import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DonorForm from "./components/DonorForm";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Search from "./pages/Search";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;