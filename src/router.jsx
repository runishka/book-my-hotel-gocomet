import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ExploreHotels from './pages/ExploreHotels';

const Router = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExploreHotels />} />
    </Routes>
);

export default Router;
