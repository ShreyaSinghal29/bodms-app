import React from "react";
import { Routes, Route } from "react-router-dom";
import DonorFormPage from "./pages/DonorFormPage";
import Home from "./pages/Home";
import Search from "./pages/Search";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<DonorFormPage />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
