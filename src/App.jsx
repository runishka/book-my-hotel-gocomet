import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ExploreHotels from "./pages/ExploreHotels";
import Places from "./pages/Places";
import HotelDetails from "./pages/HotelDetails";

const App = () => {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/explore" element={<ExploreHotels />} />
                    <Route path="/places" element={<Places />} />
                    <Route path="/hotel/:id" element={<HotelDetails />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
